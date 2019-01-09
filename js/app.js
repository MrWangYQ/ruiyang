var canvas, ctx;

var hours, minutes, seconds;

var hearts = [];

var width;

var marginTop, marginLeft;

window.onload = app;
window.onresize = app;

function app() {
    init();
    gameloop();
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    w = window.innerWidth;
    h = window.innerHeight / 4;
    var d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    canvas.width = w;
    canvas.height = h;

    width = new Heart().size.width;

    marginTop = 50;
    marginLeft = (w - 63 * width) / 2;
}

function gameloop() {
    requestAnimationFrame(gameloop);
    render();
    update();
}

function getWidthSize() {
    var width = window.innerWidth;
    var Wx = 16,
        Wy = 13;
    if (width >= 1200) {

    } else if (width >= 992) {
        Wx = '992';
        Wy = '992'
    } else if (width >= 768) {
        Wx = '768';
        Wy = '768';
    } else if (width < 768) {
        Wx = 5;
        Wy = 3;
    }
    return { Wx, Wy }
}

function Heart(scale) {
    scale = scale || 0.5;
    this.point = [];
    this.size = {};
    this.centerPoint = {};
    var wxy = getWidthSize();
    this.init(scale, wxy);
}
Heart.prototype.init = function(scale, { Wx, Wy }) {
    var xArr = [],
        yArr = [];
    for (var i = 10; i < 30; i += 0.2) {
        var t = i / Math.PI,
            x = scale * Wx * Math.pow(Math.sin(t), 3),
            y = -scale * (Wy * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        this.point.push({ x: x, y: y });
        xArr.push(x);
        yArr.push(y);
    }
    this.getCenter(xArr, yArr);
    this.getSize(xArr, yArr);
}
Heart.prototype.draw = function(translateX, translateY, color) {
    this.translateX = translateX;
    this.translateY = translateY;
    ctx.save();
    ctx.fillStyle = color || "#f00";
    ctx.translate(translateX, translateY);
    ctx.beginPath();
    for (var i = 0, len = this.point.length; i < len; i++) {
        var point = this.point[i];
        if (i === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
Heart.prototype.getCenter = function(xArr, yArr) {
    this.centerPoint = {
        x: getMValue(Math.min.apply(null, xArr), Math.max.apply(null, xArr)),
        y: getMValue(Math.min.apply(null, yArr), Math.max.apply(null, yArr))
    };
}
Heart.prototype.getSize = function(xArr, yArr) {
    this.size = {
        width: Math.abs(Math.min.apply(null, xArr) - Math.max.apply(null, xArr)),
        height: Math.abs(Math.min.apply(null, yArr) - Math.max.apply(null, yArr))
    };
}

function getMValue(min, max) {
    return min + (max - min) / 2;
}

function renderDigit(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var heart = new Heart();
                var translateX = Math.abs(heart.centerPoint.x - heart.size.width / 2 - (x + j * heart.size.width)),
                    translateY = Math.abs(heart.centerPoint.y - heart.size.height / 2 - (y + i * heart.size.width));
                heart.draw(translateX, translateY);
            }
        }
    }
}

function update() {
    var td = new Date(),
        nexthours = td.getHours(),
        nextminutes = td.getMinutes(),
        nextseconds = td.getSeconds();
    if (seconds != nextseconds) {
        if (parseInt(nexthours / 10) != parseInt(hours / 10)) {
            addBalls(marginLeft, marginTop, parseInt(hours / 10));
        }
        if (parseInt(nexthours % 10) != parseInt(hours % 10)) {
            addBalls(marginLeft + 5 * width, marginTop, parseInt(hours % 10));
        }
        if (parseInt(nextminutes / 10) != parseInt(minutes / 10)) {
            addBalls(marginLeft + 14 * width, marginTop, parseInt(minutes / 10));
        }
        if (parseInt(nextminutes % 10) != parseInt(minutes % 10)) {
            addBalls(marginLeft + 28 * width, marginTop, parseInt(minutes % 10));
        }
        if (parseInt(nextseconds / 10) != parseInt(seconds / 10)) {
            addBalls(marginLeft + 43 * width, marginTop, parseInt(seconds / 10));
        }
        if (parseInt(nextseconds % 10) != parseInt(seconds % 10)) {
            addBalls(marginLeft + 52 * width, marginTop, parseInt(seconds % 10));
        }
        seconds = nextseconds;
        hours = nexthours;
        minutes = nextminutes;
    }
    // for (var i = 0; i < hearts.length; i++) {
    //     var heart = hearts[i];
    //     heart.tx += heart.vx;
    //     heart.ty += heart.vy;
    //     heart.vy += heart.g;
    //     if (heart.ty >= h) {
    //         hearts.splice(i, 1);
    //     }
    // }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var heart = new Heart();
                var translateX = Math.abs(heart.centerPoint.x - heart.size.width / 2 - (x + j * heart.size.width)),
                    translateY = Math.abs(heart.centerPoint.y - heart.size.height / 2 - (y + i * heart.size.width));
                hearts.push({
                    heart: heart,
                    tx: translateX,
                    ty: translateY,
                    vx: (Math.random() > 0.5 ? 1 : -1) * 4,
                    vy: -10,
                    g: 1.5 + Math.random(),
                    color: 'rgb(' + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"
                })
            }
        }
    }
}

function render() {
    ctx.clearRect(0, 0, w, h);
    renderDigit(marginLeft - 15, marginTop, parseInt(hours / 10));
    renderDigit(marginLeft + 5 * width, marginTop, parseInt(hours % 10));
    renderDigit(marginLeft + 14 * width, marginTop, 10);

    renderDigit(marginLeft + 20 * width, marginTop, parseInt(minutes / 10));
    renderDigit(marginLeft + 29 * width, marginTop, parseInt(minutes % 10));
    renderDigit(marginLeft + 38 * width, marginTop, 10);

    renderDigit(marginLeft + 43 * width, marginTop, parseInt(seconds / 10));
    renderDigit(marginLeft + 52 * width, marginTop, parseInt(seconds % 10));

    // for (var i = 0; i < hearts.length; i++) {
        // var heart = hearts[i];
        // heart.heart.draw(heart.tx, heart.ty, heart.color);
    // }
}