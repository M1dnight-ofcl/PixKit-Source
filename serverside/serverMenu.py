import flask as f
from datetime import datetime
from colorama import Fore as color

version = "v0.4 patch 3 [unreleased]"

class ServerMenu(f.Flask):
  def __init__(self):
    super().__init__(__name__)
    
    @self.route('/')
    def index():
      return f.render_template("server-menu.html")
  
  def start(self):
    self.run(host='0.0.0.0', port=81)

