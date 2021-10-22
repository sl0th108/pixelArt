let gridColor = document.getElementById('colorPicker');
let gridHeight = document.getElementById('inputHeight');
let gridWidth = document.getElementById('inputWidth');
const submitButton = document.getElementById("submitButton");
const fillButton = document.querySelector('.fill-button');
const paletteButton1 = document.querySelector('.palette-button1')
const paletteButton2 = document.querySelector('.palette-button2')
const paletteButton3 = document.querySelector('.palette-button3')
const paletteButton4 = document.querySelector('.palette-button4')
const paletteButton5 = document.querySelector('.palette-button5')
const saveButton = document.querySelector('.save-button');
const loadButton = document.querySelector('.load-button');
const grid = document.getElementById('Canvas');
const allSquares = [];
let pal1 = ""
let pal2 = ""
let pal3 = ""
let pal4 = ""
let pal5 = ""

document.addEventListener('contextmenu', event => event.preventDefault());


function makeGrid(gridWidth, gridHeight) {
	while(grid.firstChild){
		grid.removeChild(grid.firstChild)
	}
	for(var i=0 ; i<gridHeight.value; i++){
		const row = grid.insertRow (i);
		for( var j=0 ; j<gridWidth.value; j++){
			allSquares.push(row.insertCell(j))
		}
	}
}


submitButton.addEventListener('click' , function(x){
	x.preventDefault();
    makeGrid(gridWidth, gridHeight);
	console.log(gridHeight + " " + gridWidth)
});


grid.addEventListener('click' , function(x) {
	if(x.target.nodeName === 'TD' ){
		x.target.style.backgroundColor = gridColor.value; 
	}

	if(!paletteButton1.style.backgroundColor){
		pal1 = paletteButton1.style.backgroundColor = gridColor.value
	}
	else if (!paletteButton2.style.backgroundColor){
		pal2 = paletteButton2.style.backgroundColor = gridColor.value
	}
	else if (!paletteButton3.style.backgroundColor){
		pal3 = paletteButton3.style.backgroundColor = gridColor.value
	}
	else if (!paletteButton4.style.backgroundColor){
		pal4 = paletteButton4.style.backgroundColor = gridColor.value
	}
	else if (!paletteButton5.style.backgroundColor){
		pal5 = paletteButton5.style.backgroundColor = gridColor.value
	}

});


paletteButton1.addEventListener('click' , function(x) {
	console.log(pal1)
	if(paletteButton1.style.backgroundColor){
		gridColor.value = pal1
	}
});

paletteButton2.addEventListener('click' , function(x) {
	if(paletteButton2.style.backgroundColor){
 		gridColor.value = pal2
 	}
 });

 paletteButton3.addEventListener('click' , function(x) {
 	if(paletteButton3.style.backgroundColor){
 		gridColor.value = pal3
 	}
 });

 paletteButton4.addEventListener('click' , function(x) {
 	if(paletteButton4.style.backgroundColor){
		gridColor.value = pal4
 	}
 });

 paletteButton5.addEventListener('click' , function(x) {
 	if(paletteButton5.style.backgroundColor){
 		gridColor.value = pal5
 	}
 });


function dragAndDraw() {
	grid.addEventListener('mousedown', (eventData) => {
		down = false
		left = eventData.which === 1
		if(left){
			down = true;
	    };
	  	grid.addEventListener('mouseup', () => {
			down = false;
	 	});
		grid.addEventListener('mouseover', (x) => {
			if(down) {
		  		x.target.style.backgroundColor = gridColor.value;
			}
	  	});
	});
}

function dragAndErase() {
	grid.addEventListener('mousedown', (eventData) => {
		down1 = false
		right = eventData.which === 3
		if(right){
	  		down1 = true;
		}
	  	grid.addEventListener('mouseup', () => {
			down1 = false;
	 	});
		grid.addEventListener('mouseover', (x) => {
			if(down1) {
		  		x.target.style.backgroundColor = "#ffff";
			}
	  	});
	});
}


function fillSquares() {
	fillButton.addEventListener('click', () => {
	  allSquares.forEach(square => (square.style.backgroundColor = gridColor.value));
	});
}

function saveBtn() {
	saveButton.addEventListener('click', () => {
	  const gridArray = [];
	  for (let i = 0; i < allSquares.length; i++) {
		const squareColors = allSquares[i];
		gridArray.push(squareColors.style.backgroundColor);
	  }
	  

	  const gridInfo = {
		grid: gridArray, 
		height: gridHeight,
		width: gridWidth,
	  }
	  
	  localStorage.setItem('gridSave', JSON.stringify(gridInfo));
	});
}

function loadBtn() {
	loadButton.addEventListener('click', () => {
		
	  const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
	  for (let i = 0; i < allSquares.length; i++) {
		allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
	  }
	  

	});
}



const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const pinBtn = document.querySelector(".pin-btn");
const linkedBtn = document.querySelector(".linked-btn");

function init() {

  let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Hi everyone, please check this out: ");

  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?media=${postUrl}&text=${postTitle}`
  );

  pinBtn.setAttribute(
    "href",
    `https://pinterest.com/pin/create/bookmarklet/?media=${postUrl}&url=${postUrl}&description=${postTitle}`
  );

  linkedBtn.setAttribute(
    "href",
    `https://www.linkedin.com/share?media=${postUrl}}&text=${postTitle}`
  );
}

init();


makeGrid(gridWidth, gridHeight);
saveBtn();
fillSquares();
dragAndDraw();
dragAndErase()
loadBtn();