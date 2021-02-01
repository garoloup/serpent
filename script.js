window.onload = function()
{
    var canvas;
    var canvasWidth=900;
    var canvasHeight=600;
    var blocksize = 30;
    var widthInBlocks = canvasWidth / blocksize;
    var heightInBlocks = canvasHeight / blocksize;
    var ctx;
    var delay = 100; // en ms
    var snakee;
    var applee;

    init();

    function init() {
    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "3px solid";
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    snakee = new snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");

    applee = new apple([10,10]);

    refreshCanvas();
    }

    function refreshCanvas() {

        snakee.move();
        if (snakee.checkCollision()) {
            console.log("Game Over");

        }
        else {
            if (snakee.isEatingApple( applee ))
            {
                snakee.ateApple = true;
                do
                    {
                        applee.setNewPosition();
                    }
                while( applee.isOnSnake( snakee ))
            }

//            ctx.fillStyle = "#ff0000";
            ctx.clearRect(0,0,canvas.width, canvas.height);

            snakee.draw();
            applee.draw();


            setTimeout(refreshCanvas,delay);
        }


    }

    function drawBlock(ctx, pos)
    {
        var x = pos[0] * blocksize;
        var y = pos[1] * blocksize;

        ctx.fillRect(x,y,blocksize,blocksize);
    }

    function snake(body, direction)
    {
        this.body=body;
        this.direction = "right";
        this.ateApple = false;

        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i=0; i< this.body.length; i++) {
                drawBlock(ctx, this.body[i]);

            }
            ctx.restore();
        };

        this.move = function() {
            var nextPos = this.body[0].slice();
            //nextPos[0] += 1;

            switch(this.direction)
                {
                    case "left":
                        nextPos[0] -= 1;
                        break;
                    case "right":
                        nextPos[0] += 1;
                        break;
                    case "up":
                        nextPos[1] -= 1;
                        break;
                    case "down":
                        nextPos[1] += 1;
                        break;
                    default:
                        throw("invalid direction");
                }

            this.body.unshift(nextPos);
            if ( ! this.ateApple)
                this.body.pop();
            else
                this.ateApple = false;

        };

        this.setDirection = function(newDir)
        {
            var allowedDir;
            switch(this.direction)
                {
                    case "left":
                    case "right":
                        allowedDir = ["up","down"];
                        break;
                    case "up":
                    case "down":
                        allowedDir = ["right","left"];
                        break;
                    default:
                        throw("invalid direction");
              }
            if (allowedDir.indexOf(newDir) > -1)
                {
                    this.direction = newDir;
                }
        };

        this.checkCollision = function() {
            var checkWall = false;
            var checkBody = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var headX = head[0];
            var headY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var outsideWallX = headX < minX || headX > maxX;
            var outsideWallY = headY < minY || headY > maxY;

            checkWall = outsideWallX || outsideWallY ;

            for(var i=0; i < rest.length;i++) {
                if (headX === rest[i][0] && headY === rest[i][1])
                    {
                        checkBody = true;
                    }
            }

            return( checkWall || checkBody);
        }

        this.isEatingApple = function( appleToEat ) {
            var head = this.body[0];
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        }
    }

    function apple(pos) {
        this.position = pos;

        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blocksize / 2;
            var x = blocksize* this.position[0] + radius;
            var y = blocksize* this.position[1] + radius;
            ctx.arc(x,y,radius,0,Math.PI*2, true);
            ctx.fill();

            ctx.restore();
        };

        this.setNewPosition = function() {
            newX = Math.round( Math.random() * (widthInBlocks -1) );
            newY = Math.round( Math.random() * (heightInBlocks -1) );
            this.position = [newX, newY];
        };

        this.isOnSnake = function( snakeToCheck ) {
            var isOnSnake = false;
            for(var i=0; i < snakeToCheck.length ; i++)
                {
                    if (this.position[0] === snakeToCheck.body[i][0] &&  this.position[1] === snakeToCheck.body[i][1])
                        isOnSnake = true;
                }
            return( isOnSnake );
        }
    }

    document.onkeydown = function handleKeyDown(e)
    {
        var newDir = "";
        switch(e.keyCode)
            {
                case 37:
                    newDir = "left";
                    break;
                case 38:
                    newDir = "up";
                    break;
                case 39:
                    newDir = "right";
                    break;
                case 40:
                    newDir = "down";
                    break;
                default:
                    return;
            }
        snakee.setDirection(newDir);
    }

}
