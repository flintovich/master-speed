window.onload=function(){
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    /*canvas.width = innerWidth;
    canvas.height = innerHeight;*/
    var width = canvas.width;
    var height = canvas.height;


    var numberSpeed = 1;
    var carStartX = 550;
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    function clear(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
    // create circle
    function circle(ctx, x, y, radius, r, g, b, transparent){
        ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', .'+transparent+')';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    // create circle (gradient)
    function circle_Grad(ctx, x, y, radius){
        var circle_gradient = ctx.createRadialGradient(x-3,y-3,1,x,y,radius);
        circle_gradient.addColorStop(0, "#A87FEF");
        circle_gradient.addColorStop(1, "#2626C1");
        ctx.fillStyle = circle_gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    // rand
    function rand (min, max){
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor( Math.random() * (max - min + 1)) + min;
    }
    function Circle(x,y,radius, r, g, b){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    function addText(text,x,y){
        ctx.font = "25px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0501";
        ctx.fillText(text,x,y);
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
    }
    function drawLine(ctx, x1, y1, x2, y2, thickness, color) {
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    // images
    var frontBg = new Image();
    frontBg.src = 'images/fon.bmp';
    var SpeedCount = new Image();
    SpeedCount.src = 'images/speedcount.png';
    var redCar = new Image();
    redCar.src = 'images/red-car.png';
    var gangsterCar = new Image();
    gangsterCar.src = 'images/gangster-car.png';

    var myCar = redCar;
    

    // game loop
    var y1=-100;
    var y2=0;

    // Car control
    function carControl(){
        if(turnLeftCar == true){
            if(carStartX <= 140){
                return false
            }
            carStartX=carStartX-(numberSpeed/2);
        }
        if(turnRightCar == true){
            if(carStartX >= 565){
                return false
            }
            carStartX=carStartX+(numberSpeed/2);
        }
        if(speedUp == true){
            if(numberSpeed >= 15){
                return false
            }
            numberSpeed=numberSpeed+0.03
        }
        if(speedDown == true){
            if(numberSpeed <= 2){
                return false
            }
            numberSpeed=numberSpeed-0.1
        }
    }

    var otherCarSpeed = new Array(4,6,8,10,12,5,9,14,13,7);
    var indexCarSpeed = 0;
    var possibleOtherCarPosition = new Array(150,280,420,550);
    var indexCarPos = 0;
    var carStartPosition = 0;
    var carStartPosition1 = 0;
    var carStartPosition2 = 0;
    var carStartPosition3 = 0;
    var carStartPosition4 = 0;
    var carStartPosition5 = 0;
    var carStartPosition6 = 0;
    var carStartPosition7 = 0;
    var carStartPosition8 = 0;
    var carStartPosition9 = 0;
    var otherCarCount = 0;

    // add other cars

    function road(){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        if(y1>=99){
            y1= -100;
            y2=0;
        }
        // center lines
        drawLine(ctx, width/2-6, 0, width/2-6, height, 5, '#fff');
        drawLine(ctx, width/2+6, 0, width/2+6, height, 5, '#fff');

        drawLine(ctx, width/6, 0, width/6, height, 5, '#fff');
        drawLine(ctx, width-width/6, 0, width-width/6, height, 5, '#fff');

        drawLine(ctx, width/3, y1, width/3, y2, 3);
        drawLine(ctx, width/3, y1+200, width/3, y2+200, 3, '#fff');
        drawLine(ctx, width/3, y1+400, width/3, y2+400, 3, '#fff');
        drawLine(ctx, width/3, y1+600, width/3, y2+600, 3, '#fff');
        drawLine(ctx, width/3, y1+800, width/3, y2+800, 3, '#fff');

        drawLine(ctx, width/2+width/2-width/3, y1, width/2+width/2-width/3, y2, 3);
        drawLine(ctx, width/2+width/2-width/3, y1+200, width/2+width/2-width/3, y2+200, 3, '#fff');
        drawLine(ctx, width/2+width/2-width/3, y1+400, width/2+width/2-width/3, y2+400, 3, '#fff');
        drawLine(ctx, width/2+width/2-width/3, y1+600, width/2+width/2-width/3, y2+600, 3, '#fff');
        drawLine(ctx, width/2+width/2-width/3, y1+800, width/2+width/2-width/3, y2+800, 3, '#fff');

        // car
        ctx.drawImage(myCar, carStartX, height-220);

        // change speed
        y1 = y1+numberSpeed;
        y2 = y2+numberSpeed;

        //speed count
        ctx.drawImage(SpeedCount, 5, height-160, 120, 120);
        addText(10*numberSpeed.toFixed(1), 65, height-90);

        // Call car control
        carControl();


        ctx.drawImage(gangsterCar, possibleOtherCarPosition[indexCarPos], carStartPosition=carStartPosition+numberSpeed-otherCarSpeed[indexCarSpeed]);
        if(carStartPosition > 2000){
            carStartPosition = -500;
            indexCarPos = rand(0,3);
            indexCarSpeed = rand(0,9);
        }

    }
    (function animationLoop(){
        road();
        requestAnimationFrame(animationLoop,'#game');
    })();


    var turnLeftCar = false;
    var turnRightCar = false;
    var speedUp = false;
    var speedDown = false;
    // keyboard ---------------------
    document.onkeydown = checkKeycode
    document.onkeyup = upKeycode
    var autoDeceleration;
    function checkKeycode(e) {
        var keycode;
        if (window.event) keycode = window.event.keyCode;
        else if (e) keycode = e.which;

        // car speed
        if(keycode == 38){
            speedUp = true;

            clearInterval(autoDeceleration);
            autoDeceleration = 0;
        } else if(keycode == 40){
            speedDown = true;
        }

        // turn car
        if(keycode == 37){
            turnLeftCar = true;
        }
        if(keycode == 39){
            turnRightCar = true;
        }
    }

    function upKeycode(e) {
        var keycode;
        if (window.event) keycode = window.event.keyCode;
        else if (e) keycode = e.which;
        if(keycode == 38){
            function deceleration(){
                if(numberSpeed <= 2){
                    return false
                }
                numberSpeed=numberSpeed-0.25
            }
            autoDeceleration = setInterval(deceleration, 1000);
        }
        // speed up
        if(keycode == 38){
            speedUp = false;
        }
        // speed down
        if(keycode == 40){
            speedDown = false;
        }
        // turn left stop
        if(keycode == 37){
            turnLeftCar = false;
        }
        // turn right stop
        if(keycode == 39){
            turnRightCar = false;
        }
    }

}
