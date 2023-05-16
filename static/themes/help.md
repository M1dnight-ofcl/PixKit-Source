# Get started with custom themes
Custom themes is an upcoming feature to pixkit, but it may be a little confusing to begin. whether that be important themes or making your own. This is the starter kit for those who plan to use and make themes.

# Import a theme
To import a theme, select [ file ] in the navbar and then click the custom themes button. This will prompt you to upload a zip file. Select the zip file provided from any source. We will open a git repo for poeple who don't want dig for themes.

# Begin creating a theme
### Get Started
The first thing to do when making a theme is to create the basic file structure. Here is the basic file structure:
```txt
| theme-name
|-> config.js  - to configure theme
|-> theme.json - add basic theme info/coloring
|-> style.css  - css file to apply styling
```

### {config.js} Contents
Here are the basic contents of [config.js]:
```javascript
// coming soon...
```
### {style.css} Starter Guide
PixKit does not come with a default stylesheet, but rather a default style. <br>
Here are some of the important IDs that need to be set:
```css
#navbar
#navbar span
#canvas
#guide
#guide div
#canvasContainer
#controlContainer
#logo
/*these are only a few of them*/
```
It is recommended to use the [default] theme as a starter, as it contains all import IDs set