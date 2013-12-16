window.onload=function(){
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    /*canvas.width = innerWidth;*/
    canvas.height = innerHeight -10;
    var width = canvas.width;
    var height = canvas.height;
    var date = new Date();
    // console.log(date.getDate()+'.'+date.getMonth()+' / '+date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds());
    // result.childNodes[1].childNodes[1].childNodes[i].childNodes[5].innerHTML=game_count_Data[u]

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
    function addText(text,x,y,size){
        ctx.font = size+'px Arial';
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

    document.getElementById('go').play();

    // images
    var SpeedCount = new Image();
    SpeedCount.src = 'images/speedcount.png';
    var redCar = new Image();
    redCar.src = 'images/red-car.png';
    var gangsterCar = new Image();
    gangsterCar.src = 'images/gangster-car.png';
    var car3 = new Image();
    car3.src = 'images/car3.png';
    var car4 = new Image();
    car4.src = 'images/car4.png';

    var myCar = redCar;
    

    // game loop
    var y1=-100;
    var y2=0;

    // Car control
    var turnLeftCar = false;
    var turnRightCar = false;
    var speedUp = false;
    var speedDown = false;
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
            if(numberSpeed >= 20){
                return false
            } else if(numberSpeed > 12){
                numberSpeed=numberSpeed+0.01
                return false
            } else if(numberSpeed > 9){
                numberSpeed=numberSpeed+0.015
                return false
            } else if(numberSpeed > 6){
                numberSpeed=numberSpeed+0.02
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

    // add other cars
    var otherCarSpeed = new Array(5,6,7,8,9,10,11,12,13,14,15,16);
    var possibleOtherCarPosition = new Array(150,280,420,550);
    var indexCarSpeed = 0;
    var indexCarSpeed2 = 0;
    var indexCarSpeed3 = 0;
    var indexCarPos = 1;
    var indexCarPos2 = 4;
    var indexCarPos3 = 3;
    var carStartPosition = -1300;
    var carStartPosition2 = -350;
    var carStartPosition3 = -800;
    function addOtherCars(){
        ctx.drawImage(gangsterCar, possibleOtherCarPosition[indexCarPos], carStartPosition=carStartPosition+numberSpeed-otherCarSpeed[indexCarSpeed]);
        ctx.drawImage(car3, possibleOtherCarPosition[indexCarPos2], carStartPosition2=carStartPosition2+numberSpeed-otherCarSpeed[indexCarSpeed2]);
        ctx.drawImage(car4, possibleOtherCarPosition[indexCarPos3], carStartPosition3=carStartPosition3+numberSpeed-otherCarSpeed[indexCarSpeed3]);
        if(carStartPosition >= 2000){
            carStartPosition = -400;
            indexCarPos = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed = rand(0,otherCarSpeed.length -1);
        } else if(carStartPosition <= -1500){
            carStartPosition = 1200;
            indexCarPos = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed = rand(0,otherCarSpeed.length -1);
        }
        if(carStartPosition2 >= 2000){
            carStartPosition2 = -450;
            indexCarPos2 = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed2 = rand(0,otherCarSpeed.length -1);
        } else if(carStartPosition2 <= -1500){
            carStartPosition2 = 1200;
            indexCarPos2 = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed2 = rand(0,otherCarSpeed.length -1);
        }
        if(carStartPosition3 >= 2000){
            carStartPosition3 = -450;
            indexCarPos3 = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed3 = rand(0,otherCarSpeed.length -1);
        } else if(carStartPosition3 <= -1500){
            carStartPosition3 = 1200;
            indexCarPos3 = rand(0,possibleOtherCarPosition.length -1);
            indexCarSpeed3 = rand(0,otherCarSpeed.length -1);
        }
    }
    // car crash function
    function carCrash(){
        function pushMyVar(){
            if(numberSpeed < otherCarSpeed.length && numberSpeed >= 12){
                numberSpeed=numberSpeed+0.3
            }
            if(numberSpeed < 12 && numberSpeed >= 7){
                numberSpeed=numberSpeed+0.3
            }
            if(numberSpeed < 7 && numberSpeed >= 4){
                numberSpeed=numberSpeed+0.2
            }
            if(numberSpeed < 4){
                numberSpeed=numberSpeed+1
            }
            document.getElementById('gudok').play();
        }
        // my car
        var x1m = carStartX;
        var x2m = carStartX +100;
        var y1m = height-220;
        var y2m = height-220+203;
        // gangster car
        var x1h = possibleOtherCarPosition[indexCarPos];
        var x2h = possibleOtherCarPosition[indexCarPos] +100;
        var y1h = carStartPosition;
        var y2h = carStartPosition+ 252;
        // car 2
        var x1h2 = possibleOtherCarPosition[indexCarPos2];
        var x2h2 = possibleOtherCarPosition[indexCarPos2] +100;
        var y1h2 = carStartPosition2;
        var y2h2 = carStartPosition2+ 218;
        // car 3
        var x1h3 = possibleOtherCarPosition[indexCarPos3];
        var x2h3 = possibleOtherCarPosition[indexCarPos3] +100;
        var y1h3 = carStartPosition3;
        var y2h3 = carStartPosition3+ 210;

        // my car into other
        if( x1m<x2h && y1m<y2h && y1m>y1h && x2m>x1h ||
            x1m<x2h2 && y1m<y2h2 && y1m>y1h2 && x2m>x1h2 ||
            x1m<x2h3 && y1m<y2h3 && y1m>y1h3 && x2m>x1h3 ){
            numberSpeed = 0.1;
            carStartX = 350;
            var car_crash = document.getElementById('car-crash');
            car_crash.play();
            game_count=game_count-200;
            game_health=game_health-1;
            game_count_Data.push(game_count.toFixed(1));
        }
        // first car into other
        if( x1h<x2h2 && y1h<y2h2 && y1h>y1h2 && x2h>x1h2 ||
            x1h<x2h3 && y1h<y2h3 && y1h>y1h3 && x2h>x1h3 ){
            carStartPosition=carStartPosition+numberSpeed-otherCarSpeed[0];
            return false
        }
        // second car into other
        if( x1h2<x2h && y1h2<y2h && y1h2>y1h && x2h2>x1h ||
            x1h2<x2h3 && y1h2<y2h3 && y1h2>y1h3 && x2h2>x1h3 ){
            carStartPosition2=carStartPosition2+numberSpeed-otherCarSpeed[0];
            return false
        }
        // third car into other
        if( x1h3<x2h2 && y1h3<y2h2 && y1h3>y1h2 && x2h3>x1h2 ||
            x1h3<x2h && y1h3<y2h && y1h3>y1h && x2h3>x1h){
            carStartPosition3=carStartPosition3+numberSpeed-otherCarSpeed[0];
            return false
        }


        // gangster car
        if( x1h<=x2m && y1h<=y2m && y1h>=y1m && x2h>=x1m){
            pushMyVar();
            carStartPosition=carStartPosition+numberSpeed-2;
        }
        // car 2
        if( x1h2<=x2m && y1h2<=y2m && y1h2>=y1m && x2h2>=x1m){
            pushMyVar();
            carStartPosition2=carStartPosition2+numberSpeed-2;
        }
        // car 3
        if( x1h3<=x2m && y1h3<=y2m && y1h3>=y1m && x2h3>=x1m){
            pushMyVar();
            carStartPosition3=carStartPosition3+numberSpeed-2;
        }
    }

    var game_count = 0;
    var game_health = 1;
    var game_count_Data = new Array();
    function gameCount(){
        game_count = game_count+(numberSpeed/98);
        addText('Result: '+game_count.toFixed(1), 65, 70, 15);
        addText('Health: '+game_health, 65, 100, 18);
    }

    function road(){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        // Call game count
        gameCount();

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

        // my car
        ctx.drawImage(myCar, carStartX, height-220);

        // change speed
        y1 = y1+numberSpeed;
        y2 = y2+numberSpeed;

        // speed count
        ctx.drawImage(SpeedCount, 5, height-160, 120, 120);
        addText(10*numberSpeed.toFixed(1), 65, height-90, 25);

        // Call car control
        carControl();

        // Call other cars function
        addOtherCars();

        // Call cars crush
        carCrash();

    }
    (function animationLoop(){
        road();
        requestAnimationFrame(animationLoop,'#game');
    })();





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
