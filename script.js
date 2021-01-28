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
    var blocksize = 30;

    init();

    function init() {
    canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "3px solid";
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    snakee = new snake([[6,4],[5,4],[4,4]]);

    refreshCanvas();
    }

    function refreshCanvas() {
        xCoord+=5;
        yCoord+=5;

        ctx.fillStyle = "#ff0000";
        ctx.clearRect(0,0,canvas.width, canvas.height);

        snakee.move();
        snakee.draw();

        setTimeout(refreshCanvas,delay);
    }

    function drawBlock(ctx, pos)
    {
        var x = pos[0] * blocksize;
        var y = pos[1] * blocksize;

        ctx.fillRect(x,y,blocksize,blocksize);
    }

    function snake(body)
    {
        this.body=body;
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
            nextPos[0] += 1;
            this.body.unshift(nextPos);
            this.body.pop();
        };
    }

}
