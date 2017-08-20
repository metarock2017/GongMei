var fei = {
    aniamted: null,
    content: null,
    data: {
        radiusRange: [10, 30],   //球的半径
        speedRange: [-5, 5],    //球的速度
        scrollHeight: null,
        scrollWdith: null
    },
    balls: [],
    ele: {
        canvas: null 
    },
    fn: {
        creatRandom: function(startInt, endInt){    //生产随机数
            var iResult; 
            iResult = startInt + (Math.floor(Math.random() * (endInt - startInt + 1)));
            return iResult;
        },
        init: function() {
            fei.data.clientWidth = window.innerWidth;
            fei.data.clientHeight = window.innerHeight;
            fei.ele.canvas = document.getElementById('canvas'); 
            fei.content = fei.ele.canvas.getContext('2d');  
            fei.ele.canvas.width = fei.data.clientWidth - 20;
            fei.ele.canvas.height = fei.data.clientHeight - 25;
        },
        addBall: function() {
            var aRandomColor = [];  //产生随机颜色
            aRandomColor.push(fei.fn.creatRandom(0,255));
            aRandomColor.push(fei.fn.creatRandom(0,255));
            aRandomColor.push(fei.fn.creatRandom(0,255)); 
            var iRandomRadius = fei.fn.creatRandom(fei.data.radiusRange[0], fei.data.radiusRange[1]);    //随机半径
            var oTempBall = {
                coordsX: fei.fn.creatRandom(iRandomRadius, fei.ele.canvas.width - iRandomRadius),
                coordsY: fei.fn.creatRandom(iRandomRadius, fei.ele.canvas.height - iRandomRadius),
                radius: iRandomRadius,  
                bgColor: 'rgba(' + aRandomColor[0] + ', ' + aRandomColor[1] + ', ' + aRandomColor[2] + ', 1)'
            }; 
            oTempBall.speedX = fei.fn.creatRandom(fei.data.speedRange[0], fei.data.speedRange[1]);
            oTempBall.speedY = fei.fn.creatRandom(fei.data.speedRange[0], fei.data.speedRange[1]);
            if(oTempBall.speedX === 0) {
                oTempBall.speedX = 1;
            }
            if(oTempBall.speedY === 0) {
                oTempBall.speedY = 1;
            }
            fei.balls.push(oTempBall);
        },
        drawBall: function(bStatic) {  
            var i, iSize;
            fei.content.clearRect(0, 0, fei.ele.canvas.width, fei.ele.canvas.height)
            for(var i = 0, iSize = fei.balls.length; i < iSize; i++){
                var oTarger = fei.balls[i];  
                fei.content.beginPath();
                fei.content.arc(oTarger.coordsX, oTarger.coordsY, oTarger.radius, 0, 10);
                fei.content.fillStyle = oTarger.bgColor;  
                fei.content.fill();
                if(!bStatic) {
                    var aRandomColor = [];  //产生随机颜色
                    aRandomColor.push(fei.fn.creatRandom(0,255));
                    aRandomColor.push(fei.fn.creatRandom(0,255));
                    aRandomColor.push(fei.fn.creatRandom(0,255)); 
                    //边界碰撞检测：
                    if(oTarger.coordsX + oTarger.radius >= fei.ele.canvas.width){
                        oTarger.speedX =- (Math.abs(oTarger.speedX));
                        oTarger.bgColor = 'rgba(' + aRandomColor[0] + ', ' + aRandomColor[1] + ', ' + aRandomColor[2] + ', 1)';
                    }
                    if(oTarger.coordsX - oTarger.radius <= 0){
                        oTarger.speedX = Math.abs(oTarger.speedX);                
                        oTarger.bgColor = 'rgba(' + aRandomColor[0] + ', ' + aRandomColor[1] + ', ' + aRandomColor[2] + ', 1)';
                    }
                    if(oTarger.coordsY - oTarger.radius <= 0){
                        oTarger.speedY = Math.abs(oTarger.speedY);
                        oTarger.bgColor = 'rgba(' + aRandomColor[0] + ', ' + aRandomColor[1] + ', ' + aRandomColor[2] + ', 1)';
                    }
                    if(oTarger.coordsY + oTarger.radius >= fei.ele.canvas.height){
                        oTarger.speedY =- (Math.abs(oTarger.speedY));
                        oTarger.bgColor = 'rgba(' + aRandomColor[0] + ', ' + aRandomColor[1] + ', ' + aRandomColor[2] + ', 1)';
                    }
                    oTarger.coordsX = oTarger.coordsX + oTarger.speedX;
                    oTarger.coordsY = oTarger.coordsY + oTarger.speedY; 
                }
            }
        },
        run: function() {
            fei.fn.drawBall();
            fei.aniamted = setTimeout(function() {
                fei.fn.drawBall();
                fei.aniamted = setTimeout(arguments.callee, 10)
            },10);
        }
    }
};

window.onload = function() {
    fei.fn.init();
    var i;
    for(var i = 0; i < 10; i++){
        fei.fn.addBall();
    }
    fei.fn.run();
    document.getElementById('addBall').onclick = function() {
        var i;
        for(var i = 0; i < 10; i++){
            fei.fn.addBall(); 
        }
        fei.fn.drawBall(true);
    }
    var canvas = document.getElementById("convas");
    window.onresize = resizeCanvas;
    function resizeCanvas() {
        fei.fn.init();
        fei.fn.drawBall(true);
    }
    resizeCanvas();
}

