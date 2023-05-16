$(document).ready(function() {
  $.getJSON('static/themes/default/default.json', function(data) {
    let theme = data;      
    console.log(theme)
    let root = document.documentElement; //right here
    root.style.setProperty('--bgClr', theme.backgroundColor);
    root.style.setProperty('--txClr', theme.textColor);
    root.style.setProperty('--uiClr', theme.interfaceColor);
    root.style.setProperty('--olClr', theme.outlineColor);
    root.style.setProperty('--nlClr', theme.navbarItemColor);
    root.style.setProperty('--avClr', theme.activeColor);
    $('head').append(`<link rel="stylesheet" type="text/css" href="${theme["customCssPath"]}">`);
  });
});
