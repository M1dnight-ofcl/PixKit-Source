import flask as f, re, base64, threading, os
from replit import db
from PIL import Image
from io import BytesIO
from datetime import datetime
from colorama import Fore as color
from serverside import serverMenu as internal

version = "v0.7 patch 1"

class Sketch(f.Flask):
  def __init__(self):
    super().__init__(__name__)

    print("Pixkit\nversion %s\nby %s" %(version, "M1dnightDev"))
    print("%s|%s| server has been initialized%s" %(color.BLUE, datetime.now(), color.RESET))
    
    @self.route('/')
    def home():
      return f.render_template("home.html")
      
    @self.route('/app', methods=['GET', 'POST'])
    def app():
      image = None
      return f.render_template("index.html", data=image)

    @self.route('/m')
    def mobile():
      return f.render_template("mobile.html")
    
    @self.route('/uploadcloud', methods=['GET', 'POST'])
    def uploadToCloud():
      global DIR, FNAME, im
      DIR =  str(f.request.form['dir'].replace(" ", ""))
      FNAME = str(f.request.form['name'].replace(" ", ""))
      PATH = str(os.path.join("/serverside/serverStorage/", DIR))
      print(f'fullpath= {PATH},\ndirectory= {DIR},\nfilename= {FNAME},')
      if os.path.isdir(PATH):
        print("|%s| %s exists, no action needed" %(datetime.now(), DIR))
      elif os.path.isfile(PATH):
        print("|%s| cloud save ran into TypeError" %(datetime.now()))
        return "|%s| cloud save ran into TypeError" %(datetime.now())
      else:
        if not os.path.exists(PATH):
          os.makedirs(PATH, 0o666)
        print("|%s| made %s" %(datetime.now(), DIR))
        
      if os.path.exists(PATH):
        # recheck dir
        if os.path.exists(PATH):
          image_data = re.sub('^data:image/.+;base64,', '', f.request.form['img'])
          im = Image.open(BytesIO(base64.b64decode(image_data)))
          im.save(f'{PATH}/{FNAME}.png')
          id = 0
          for char in image_data.split(""):
            id = id + str(ord(char))
            print(id)
          dbKey = base64.b64encode(f"in_{DIR}/{FNAME}.png id={id}")
          db[dbKey] = image_data
          print(db[dbKey])
          if os.path.isfile(f'/static/serverside/serverStorage/{DIR}/{FNAME}.png'):
            print("|%s| cloud save ran sucessfully" %(datetime.now()))
            return f.redirect("/app")
          else:
            print("|%s| cloud save failed saved file check" %(datetime.now()))
            return "|%s| cloud save failed saved file check" %(datetime.now())
        else:
          print("|%s| cloud save ran into unkown error" %(datetime.now()))
          return "|%s| cloud save ran into unknown error" %(datetime.now())
      else:
        print("|%s| dir doesn't exist" %(datetime.now()))
        return "|%s| dir doesn't exist" %(datetime.now())
      
  def __del__(self):
    print("%s|%s| server has been shutdown" %(color.RED, datetime.now()))

  def start(self):
    print("%s|%s| server has been started%s" %(color.GREEN, datetime.now(), color.RESET))
    App = threading.Thread(traget=self.run(host='0.0.0.0', port=81))
    App.start()

App = Sketch()
App.start()
# internal.ServerMenu().start()