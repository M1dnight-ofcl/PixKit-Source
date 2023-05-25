/* 
By M1dnightDev (c) 2023
v0.1.b
*/

var canvas =         document.getElementById("canvas");
var brushColor =     document.getElementById("color");
var brushWidth =     document.getElementById("width");
var brushGuide =     document.getElementById("guide");
var reloadCanvas =   document.getElementById("reload");
var saveCanvas =     document.getElementById("save");
var canvasClear =    document.getElementById("clear");
var guideToggle =    document.getElementById("guideTog");
var canvasContext =  canvas.getContext("2d");
var eraser =         document.getElementById("eraser");

var NotValidRes = true;
var userInputRes;
var tool = 'd';

while (NotValidRes) {
  userInputRes = prompt("What would you like your canvas resolution to be?", "0");
  if (!userInputRes) {
    alert("Resolution not selected. Setting to default (16)");
  }
  if (parseInt(userInputRes) > 96 && parseInt(userInputRes) <= 0) {
    alert("Resolution too high. Please try a value under 96.")
    NotValidRes = true;
  } else {
    NotValidRes = false;
  };
};
if (userInputRes <= 0) userInputRes = 16;

var cellSideCount =     parseInt(userInputRes);
var cellPixelLength =   canvas.width / cellSideCount;
var colorHistory =      {};
var previousCanvaData = {};

brushColor.value =        "#000000";
canvasContext.fillStyle = "#ffffff";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

{
  brushGuide.style.width = `${canvas.width}px`;
  brushGuide.style.height = `${canvas.height}px`;
  brushGuide.style.gridTemplateColumns = `repeat(${cellSideCount}, 1fr)`;
  brushGuide.style.gridTemplaterows =    `repeat(${cellSideCount}, 1fr)`;

  [...Array(cellSideCount ** 2)].forEach(() => brushGuide.insertAdjacentHTML("beforeend", "<div></div>"))
}

function handleCanvasMousedown(e) {
  // ensure primary
  if (e.button !== 0) {
    return;
  }
  var canvasBoundingRect = canvas.getBoundingClientRect();
  var x = e.clientX - canvasBoundingRect.left;
  var y = e.clientY - canvasBoundingRect.top;
  var cX = Math.floor(x / cellPixelLength);
  var cY = Math.floor(y / cellPixelLength);
  var currentCellColor = colorHistory[`${cX}_${cY}`];

  if(tool == 'e') {
    localStorage.setItem('oldColor', brushColor.value)
    brushColor.value = '#ffffff';
    fillCell(cX, cY)
    delete colorHistory[`${cX}_${cY}`]
    brushColor.value = localStorage.getItem('oldColor');
  } else {
    fillCell(cX, cY);
  }
}
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    tool = 'e';
  }
});

$(window).on('beforeunload', function() {
  if(colorHistory != {}) {
    return confirm("Do you really want to close? You will lose your current drawing!");
  }
});

eraser.addEventListener('change', function(e) {
  if(eraser.checked) {
    tool = 'e';
  } else {
    tool = 'd';
  }
});

function handleClearButtonClick() {
  var yes = confirm("Are you sure you want to clear the canvas?")

  if (!yes) return;
  
  canvasContext.fillStyle = "#ffffff";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function handleReloadButtonClick() {
  if (colorHistory !== {}) {
    var yes = confirm("You have an unsaved drawing. Would you still like to create a new drawing?");

    if (!yes) return;

    location.reload()
  }
}
function handleToggleGuideChange() {
  brushGuide.style.display = guideToggle.checked ? null : "none";
}
function fillCell(cellX, cellY) {
  // get position
  var startX = (cellX * cellPixelLength);
  var startY = (cellY * cellPixelLength);

  canvasContext.fillStyle = brushColor.value;
  canvasContext.fillRect(startX, startY, cellPixelLength * brushWidth.value, cellPixelLength * brushWidth.value);
  colorHistory[`${cellX}_${cellY}`] = brushColor.value;
}
function handleExportCanvas() {
  var link = document.createElement('a');
  link.download = 'PixKit_Drawing.png';
  link.href = canvas.toDataURL({pixelRatio: 4})
  link.click();
}
function handleExportCanvasJPEG() {
  var link = document.createElement('a');
  link.download = 'PixKit_Drawing.jpeg';
  link.href = canvas.toDataURL({pixelRatio: 4})
  link.click();
}
function handleExportCanvasWEBP() {
  var link = document.createElement('a');
  link.download = 'PixKit_Drawing.webp';
  link.href = canvas.toDataURL({pixelRatio: 4})
  link.click();
}

canvas.addEventListener("mousedown", handleCanvasMousedown);
guideToggle.addEventListener("change", handleToggleGuideChange);

function KeyPress(e) {
  // if ctrl+z pressed
  var evtobj = window.event? event : e
  if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
    alert("Coming Soon (I'm sorry)")
  };
}

document.onkeydown = KeyPress;

document.getElementById("file-export-asPNG").addEventListener("click", handleExportCanvas);
document.getElementById("file-export-asJPEG").addEventListener("click", handleExportCanvasJPEG);
document.getElementById("file-export-asWEBP").addEventListener("click", handleExportCanvasWEBP);

document.getElementById("file-new").addEventListener("click", handleReloadButtonClick);
document.getElementById("file-clear").addEventListener("click", handleClearButtonClick);

function loadSettingsMenu() {
  var sm = document.getElementById("settings-menu");
  if (sm.style.display == "none") {
    sm.style.display = "block";
  } else {
    sm.style.display = "none";
  }
  
}

function switchToSettingTab(tabName) {
  var tabcontent = document.getElementsByClassName("settingsContent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

document.getElementById("settings-span").addEventListener("click", loadSettingsMenu);
document.getElementById("close-icon").addEventListener("click", loadSettingsMenu);

document.getElementById("zoom").addEventListener("change", () => {
  scale = 100 + (document.getElementById("zoom").value * 10)
  canvasContainer = document.getElementById("canvasContainer")
  canvasContainer.style.transform = "scale("+ scale.toString() +"%)"
});

function uploadDrawing() {
  var exported = canvas.toDataURL();
  Invalid = true
  while (Invalid) {
    filename = prompt("What would you like to name your file?", "file");
    if (!userInputRes) {
      alert("Name not select, please set a name.");
    } else {
      Invalid = false;
    };
  };
  Invalid = true
  while (Invalid) {
    directory = prompt("What directory would you like to save your drawing to? (If nonexistent, new will be created)", "global");
    if (!userInputRes) {
      alert("Dirctory not select, please select a directory.");
    } else {
      Invalid = false;
    };
  };
  
  yes = confirm("Are you sure you want to upload this file? (it will be public)");
  if (!yes) return;
  $.ajax({
    type: "POST",
    url: "/uploadcloud",
    data: { img: exported, dir: directory, name: filename},
    cache: false,
    success: function(data) {
      alert("File saved to cloud.");
    }
    }).done(function(o) {
      console.log('saved'); 
    });
};

document.getElementById("file-server-upload").addEventListener("click", uploadDrawing)