window.onload = function()
{
    var canvas;
    var canvasWidth=900;
    var canvasHeight=600;
    var ctx;
    var delay = 100; // en ms
    var xCoord=0;
    var yCoord=0;
    var snakee;
    var applee;
    var blocksize = 30;

    init();

    function init() {
    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "3px solid";
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    snakee = new snake([[6,4],[5,4],[4,4]], "right");

    applee = new apple([10,10]);

    refreshCanvas();
    }

    function refreshCanvas() {
        xCoord+=5;
        yCoord+=5;

        ctx.fillStyle = "#ff0000";
        ctx.clearRect(0,0,canvas.width, canvas.height);

        snakee.move();
        snakee.draw();
        applee.draw();

        setTimeout(refreshCanvas,delay);
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
            this.body.pop();
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
    }

    function apple(pos) {
        this.position = pos;

        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            var radius = blocksize / 2;
            var x = blocksize* this.position[0] + radius;
            var y = blocksize* this.position[1] + radius;
            ctx.arc(x,y,radius,0,Math.PI*2, true);
            ctx.fill();

            ctx.restore();
        };
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
