var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

function drawLines () {
    // 画好坐标系
    for (var k = 0; k < 100; k++) {
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(10 * k, 0)
        context.lineTo(10 * k, 1000);
        context.stroke();
        context.moveTo(0, 10 * k)
        context.lineTo(1000, 10 * k);
        context.stroke();
    }
}

var x = 2;

function drawPoint(x, y) {
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, false);
    context.fillStyle = "red";
    context.fill();

    context.stroke();
    context.closePath();
}
//画移动的线
function drawMivie(n,parabolic) {
    var y = 0 ;
    for (var i = 0; i < n; i++) {
       y += (parabolic[i][n] * Math.pow(x,(n - 1 - i)))
    }
    context.beginPath();
    context.moveTo(x,y);
    x = x + 1;

    if (x > 1000) {
        x = 0;
        clearInterval(inteval)
    } else {
        //防止首位相连
        // y = Math.pow(x, 2) * 0.005
        var y = 0 ;
        for (var i = 0; i < n; i++) {
        y += (parabolic[i][n] * Math.pow(x,(n - 1 - i)))
        }
        context.lineTo(x, y);
        context.strokeStyle = "blue";
        context.lineWidth = 1;
        context.stroke();
        context.closePath();
    }


}

// drawPoint(0,40);
// drawPoint(40,30);
//定位到起点
var inteval;
drawLines();
function drawFunction(n,parabolic) {

    drawMivie(n,parabolic);
    inteval = setInterval(function () {
        drawMivie(n,parabolic);
    }, 1);
}