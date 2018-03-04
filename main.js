//Gameboard
function GameBoard(game) {
    Entity.call(this, game, 0, 0);
    this.player = 0;
    this.board = [];
    for (var i = 0; i < 80; i++) {
        this.board.push([]);
        for (var j = 0; j < 80; j++) {
            this.board[i].push(0);
        }
    }
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.howManyNeighbors = function (x,y) {
    var output = 0;

    if((x+1 < 80) && this.board[x+1][y] == 1) {
        output++;
    }
    if((x-1 >= 0) && this.board[x-1][y] == 1) {
        output++;
    }

    if((y+1 < 80) && this.board[x][y+1] == 1) {
        output++;
    }
    if((y-1 >= 0) && this.board[x][y-1] == 1) {
        output++;
    }


    if((y+1 < 80 && x+1 < 80) && this.board[x+1][y+1] == 1) {
        output++;
    }



    if((y-1 >= 0 && x-1 >= 0) && this.board[x-1][y-1] == 1) {
        output++;
    }


    if((x+1 < 80 && y-1 >= 0) && this.board[x+1][y-1] == 1) {
        output++;
    }
    if((y+1 < 80 && x-1 >= 0) && this.board[x-1][y+1] == 1) {
        output++;
    }

    return output;
}

GameBoard.prototype.update = function () {
    if(started) {
    var updateBoard = [];
    for (var i = 0; i < 80; i++) {
        updateBoard.push([]);
        for (var j = 0; j < 80; j++) {
            updateBoard[i].push(0);
        }
    }
    
    for(var y = 0; y<80; y++) {
        for(var x = 0; x<80 ; x++) {
            var neighbors = this.howManyNeighbors(x,y);
            if(neighbors<2 || neighbors >3) {
                updateBoard[x][y] = 0;
            }
            if(neighbors == 2) {
                updateBoard[x][y] = this.board[x][y];
            }
            if(neighbors == 3) {
                updateBoard[x][y] = 1;
            }
        }
    }

    for(var y = 0; y<80; y++) {
        for(var x = 0; x<80 ; x++) {
            this.board[x][y] = updateBoard[x][y];
        }
    }}
    Entity.prototype.update.call(this);
}

GameBoard.prototype.setXY = function(x,y,value) {
    this.board[x][y] = value;
};

GameBoard.prototype.draw = function (ctx) {

    for (var x = 0; x<2010; x = x+25) {
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,2000);
        ctx.stroke();
    }
    for (var x = 0; x<2010; x = x+25) {
        ctx.beginPath();
        ctx.moveTo(0,x);
        ctx.lineTo(2000,x);
        ctx.stroke();
    }
    

    for (var i = 0; i < 80; i++) {
        for (var j = 0; j < 80; j++) {
            if (this.board[i][j] === 1) {

            	var testImage = new Image(25,25);
            	testImage.src = './img/black.png';

				ctx.drawImage(testImage, i*25, j*25, 25, 25);
            }
        }
    }
}

var socket = io.connect("http://24.16.255.56:8888");
var saveXData = [10,11,10,11,13, 14,13,14,11,11, 11,13,13,13,10, 14,9,15,9,15, 9,15,23,24,24 ,23,22,9,9,10, 10,18,19,19,17, 17,18,25,26,25, 25,27,31,31,32, 33,33,32,43,43 , 44,44,44,45,46, 44,44,33,34,35,33,34];
var saveYData = [10,10,11,11,10,10,11,11,12,13 ,14,12,13,14,15,15,15,15,14,14,13,13,5,6,7,7,7,36,37,37,36,36,36,37,37,38,38,38,38,39,40,39,36,35,36,35,34,34,34,35,35,34,41,41,42,42,43,46,46,46,47,48];

socket.emit("save", { studentname: "Karan Kurbur", statename: "XDATA", data: saveXData});
socket.emit("save", { studentname: "Karan Kurbur", statename: "YDATA", data: saveYData});

var count = 0;
var loadXData;
var loadYData;
	socket.emit("load", { studentname: "Karan Kurbur", statename: "XDATA" });
	socket.emit("load", { studentname: "Karan Kurbur", statename: "YDATA" });


socket.on("load", function (data) {
    console.log(data);
    if(count == 0) {
    	loadXData = data;
    }
    if(count == 1) {
    	loadYData = data;


    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    console.log("HERE");
    var gameEngine = new GameEngine();
    var gameboard = new GameBoard(gameEngine);
    console.log(loadXData.data.size);
    console.log(loadYData.data.length);

	// do {
	// }
	// while(count <= 1);
	//console.load(loadXData);




	for(var i = 0; i<62 ; i++) {
		gameboard.setXY(loadXData.data[i],loadYData.data[i],1);
	}

    // //Tumbler Init
    // gameboard.setXY(10,10,1);
    // gameboard.setXY(11,10,1);


    // gameboard.setXY(10,11,1);
    // gameboard.setXY(11,11,1);
    // gameboard.setXY(13,10,1);
    // gameboard.setXY(14,10,1);
    // gameboard.setXY(13,11,1);
    // gameboard.setXY(14,11,1);
    // gameboard.setXY(11,12,1);
    // gameboard.setXY(11,13,1);
    // gameboard.setXY(11,14,1);
    // gameboard.setXY(13,12,1);
    // gameboard.setXY(13,13,1);
    // gameboard.setXY(13,14,1);
    // gameboard.setXY(10,15,1);
    // gameboard.setXY(14,15,1);
    // gameboard.setXY(9,15,1);
    // gameboard.setXY(15,15,1);
    // gameboard.setXY(9,14,1);
    // gameboard.setXY(15,14,1);
    // gameboard.setXY(9,13,1); 
    // gameboard.setXY(15,13,1);


    // //Glider Init
    // gameboard.setXY(23,5,1);
    // gameboard.setXY(24,6,1);
    // gameboard.setXY(24,7,1);
    // gameboard.setXY(23,7,1);
    // gameboard.setXY(22,7,1);


    // //Gospel Glider Gun
    //  gameboard.setXY(9,36,1);
    //  gameboard.setXY(9,37,1);
    //  gameboard.setXY(10,37,1);
    //  gameboard.setXY(10,36,1);
    //  gameboard.setXY(18,36,1);
    //  gameboard.setXY(19,36,1);
    //  gameboard.setXY(19,37,1);
    //  gameboard.setXY(17,37,1);
    //  gameboard.setXY(17,38,1);
    //  gameboard.setXY(18,38,1);

    //  gameboard.setXY(25,38,1);
    //  gameboard.setXY(26,38,1);
    //  gameboard.setXY(25,39,1);
    //  gameboard.setXY(25,40,1);
    //  gameboard.setXY(27,39,1);


    //  gameboard.setXY(31,36,1);
    //  gameboard.setXY(31,35,1);
    //  gameboard.setXY(32,36,1);

    //  gameboard.setXY(33,35,1);
    //  gameboard.setXY(33,34,1);
    //  gameboard.setXY(32,34,1);


    //  gameboard.setXY(43,34,1);
    //  gameboard.setXY(43,35,1);
    //  gameboard.setXY(44,35,1);
    //  gameboard.setXY(44,34,1);

    //  gameboard.setXY(44,41,1);
    //  gameboard.setXY(45,41,1);
    //  gameboard.setXY(46,42,1);
    //  gameboard.setXY(44,42,1);
    //  gameboard.setXY(44,43,1);

    //  gameboard.setXY(33,46,1);
    //  gameboard.setXY(34,46,1);
    //  gameboard.setXY(35,46,1);
    //  gameboard.setXY(33,47,1);
    //  gameboard.setXY(34,48,1);




    
    // console.log(gameboard.howManyNeighbors(10,10));
    // console.log("GAME ENGINE " + gameEngine);
    gameEngine.addEntity(gameboard);
    gameEngine.init(ctx);
    //var attacker = new attackDude(gameEngine, ASSET_MANAGER.getAsset("./img/Attack.png"));
    //gameEngine.addEntity(attacker);
    gameEngine.start();

    }
    count++;
});
	

//});



function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}



function startFunction() {
    console.log("THIS WORKLED");
    started = true;
}
var started = false;
