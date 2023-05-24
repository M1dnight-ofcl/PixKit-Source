var config = function(data) {
  let theme = data;      
  console.log(theme)
  let root = document.documentElement; //right here
  root.style.setProperty('--bgClr', theme.backgroundColor);
  root.style.setProperty('--txClr', theme.textColor);
  root.style.setProperty('--uiClr', theme.interfaceColor);
  root.style.setProperty('--olClr', theme.outlineColor);
  root.style.setProperty('--nlClr', theme.navbarItemColor);
  root.style.setProperty('--avClr', theme.activeColor);
  var css = document.createElement("link");
  css.rel =  "stylesheet";
  css.href = theme["customCssPath"];
  $('head').append(css);
}

$(document).ready(function() {
  $.getJSON('static/themes/translucent/default.json', config);
});