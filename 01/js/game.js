window.onload = function() {
    let canvas = document.querySelector('#canvas'),
        chess = [],   //记录棋子在哪些地方已经下过
        bw = true,  //默认黑棋先行
        go = true,
        two = document.querySelector('#two'),
        ai = document.querySelector('#ai'),
        option = document.querySelector('#cover'),
        menu = document.querySelector('.menu');

    for (let i = 0; i < 21; i++) {    //记录棋盘上位置的棋子
        chess[i] = [];
        for (let j = 0; j < 21; j++) {
            chess[i][j] = 0;
        }
    }

    drawChessLine();    //初始化棋盘

    two.onclick = function() {
        option.style.display = 'none';
        menu.style.display = 'none';
        canvas.addEventListener('click', (e) => {
            let i = Math.floor(e.offsetX / 30),
                j = Math.floor(e.offsetY / 30);
            if (go) {
                if (chess[i][j] == 0) {
                    drawChess(i, j, bw);
                    isWin1(i, j, bw);
                    bw = !bw;
                } else {
                    alert("换个地方走？");
                    return false;
                }
            } else {
                alert("游戏已经结束了大哥。。。不点了行吗，接着玩你刷新页面啊");
                return false;
            }
        });
    };

    ai.onclick = function() {
        option.style.display = 'none';
        menu.style.display = 'none';
        canvas.addEventListener('click', (e) => {
            let i = Math.floor(e.offsetX / 30),
                j = Math.floor(e.offsetY / 30);
            if (bw && go) {
                if (chess[i][j] !== 0) {
                    alert("换个地方走？");
                    return false;
                }
                drawChess(i, j, bw);
                isWin2(i, j, bw);
                bw = !bw;
                if (!bw) {
                    console.log("走的坐标:", i, j);
                    comGo(i, j, bw);
                    bw = !bw;
                }
            } else if (!bw) {
                alert("别……别点啊，不该你出棋");
                return false;
                if (!bw) {
                    comGo(i, j, bw);
                    bw = !bw;
                }
            } else if (!go) {
                alert("游戏已经结束了大哥。。。不点了行吗，接着玩你刷新页面啊");
                return false;
            }
        });
    }

    //各函数
    function drawChessLine() {    //画棋盘的函数
        let canvas = document.querySelector('#canvas'),
            ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        for (let i = 0; i < 21; i++) {
            ctx.beginPath();
            ctx.moveTo(15 + (30 * i), 15);
            ctx.lineTo(15 + (30 * i), 615);
            ctx.stroke();
            ctx.moveTo(15, 15 + (30 * i));
            ctx.lineTo(615, 15 + (30 * i));
            ctx.stroke();
            ctx.closePath();
        }
    }

    function drawChess(x, y, bw) {    //下棋子的函数
        let canvas = document.querySelector('#canvas'),
            ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(15 + 30 * x, 15 + 30 * y, 12, 0, 2 * Math.PI, false);
        ctx.closePath();

        if (chess[x][y] == 0) {
            if (bw) {
                let gradient = ctx.createLinearGradient(15 + 30 * x + 5, 15 + 30 * y + 5, 15 + 30 * x - 5, 15 + 30 * y - 5);
                gradient.addColorStop(0, "#060606");
                gradient.addColorStop(1, "#555962");
                ctx.fillStyle = gradient;
                ctx.fill();
                chess[x][y] = 1;
            } else {
                let gradient = ctx.createLinearGradient(15 + 30 * x + 5, 15 + 30 * y + 5, 15 + 30 * x - 5, 15 + 30 * y - 5);
                gradient.addColorStop(0, "#ccd3d9");
                gradient.addColorStop(1, "#f3f3f3");
                ctx.fillStyle = gradient;
                ctx.fill();
                chess[x][y] = 2;
            }
        }
    }

    function isWin1(x, y, bw) {    //判断输赢的函数
        let count1 = 0,   //左右
            count2 = 0,   //上下
            count3 = 0,   //斜线
            count4 = 0;   //反斜线
        if (bw) {   //黑胜
            //左右赢法
            for (var i = x + 1; i < 21; i++) {
                if (chess[i][y] !==  1) {
                    break;
                }
                count1++;
            }
            for (var i = x; i >= 0; i--) {
                if (chess[i][y] !==  1) {
                    break;
                }
                count1++;
            }
            //上下赢法
            for (var i = y + 1; i < 21; i++) {
                if (chess[x][i] !==  1) {
                    break;
                }
                count2++;
            }
            for (var i = y; i >= 0; i--) {
                if (chess[x][i] !==  1) {
                    break;
                }
                count2++;
            }
            //斜线赢法（左下右上）
            for (var i = x + 1, j = y - 1; i < 21, j >= 0; i++, j--) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count3++;
            }
            for (var i = x, j = y; i >= 0, j < 21; i--, j++) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count3++;
            }
            //反斜线赢法（左上右下)
            for (var i = x + 1, j = y + 1; i < 21, j < 21; i++, j++) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count4++;
            }
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count4++;
            }
            if (count1 == 5 || count2 == 5 || count3 == 5 || count4 == 5) {
                alert("黑方胜");
                go = false;
                console.log("黑方胜");
            }
        } else {    //白胜
            //左右赢法
            for (var i = x + 1; i < 21; i++) {
                if (chess[i][y] !==  2) {
                    break;
                }
                count1++;
            }
            for (var i = x; i >= 0; i--) {
                if (chess[i][y] !==  2) {
                    break;
                }
                count1++;
            }
            //上下赢法
            for (var i = y + 1; i < 21; i++) {
                if (chess[x][i] !==  2) {
                    break;
                }
                count2++;
            }
            for (var i = y; i >= 0; i--) {
                if (chess[x][i] !==  2) {
                    break;
                }
                count2++;
            }
            //斜线赢法（左下右上）
            for (var i = x + 1, j = y - 1; i < 21, j >= 0; i++, j--) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count3++;
            }
            for (var i = x, j = y; i >= 0, j < 21; i--, j++) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count3++;
            }
            //反斜线赢法（左上右下)
            for (var i = x + 1, j = y + 1; i < 21, j < 21; i++, j++) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count4++;
            }
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count4++;
            }
            if (count1 == 5 || count2 == 5 || count3 == 5 || count4 == 5) {
                alert("白方胜");
                go = false;
                console.log("白方胜");
            }
        }
    }

    function isWin2(x, y, bw) {    //判断输赢的函数
        let count1 = 0,   //左右
            count2 = 0,   //上下
            count3 = 0,   //斜线
            count4 = 0;   //反斜线
        if (bw) {   //黑胜
            //左右赢法
            for (var i = x + 1; i < 21; i++) {
                if (chess[i][y] !==  1) {
                    break;
                }
                count1++;
            }
            for (var i = x; i >= 0; i--) {
                if (chess[i][y] !==  1) {
                    break;
                }
                count1++;
            }
            //上下赢法
            for (var i = y + 1; i < 21; i++) {
                if (chess[x][i] !==  1) {
                    break;
                }
                count2++;
            }
            for (var i = y; i >= 0; i--) {
                if (chess[x][i] !==  1) {
                    break;
                }
                count2++;
            }
            //斜线赢法（左下右上）
            for (var i = x + 1, j = y - 1; i < 21, j >= 0; i++, j--) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count3++;
            }
            for (var i = x, j = y; i >= 0, j < 21; i--, j++) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count3++;
            }
            //反斜线赢法（左上右下)
            for (var i = x + 1, j = y + 1; i < 21, j < 21; i++, j++) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count4++;
            }
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chess[i][j] !== 1) {
                    break;
                }
                count4++;
            }
            if (count1 == 5 || count2 == 5 || count3 == 5 || count4 == 5) {
                alert("你胜了");
                go = false;
                console.log("黑方胜");
            }
        } else {    //白胜
            //左右赢法
            for (var i = x + 1; i < 21; i++) {
                if (chess[i][y] !==  2) {
                    break;
                }
                count1++;
            }
            for (var i = x; i >= 0; i--) {
                if (chess[i][y] !==  2) {
                    break;
                }
                count1++;
            }
            //上下赢法
            for (var i = y + 1; i < 21; i++) {
                if (chess[x][i] !==  2) {
                    break;
                }
                count2++;
            }
            for (var i = y; i >= 0; i--) {
                if (chess[x][i] !==  2) {
                    break;
                }
                count2++;
            }
            //斜线赢法（左下右上）
            for (var i = x + 1, j = y - 1; i < 21, j >= 0; i++, j--) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count3++;
            }
            for (var i = x, j = y; i >= 0, j < 21; i--, j++) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count3++;
            }
            //反斜线赢法（左上右下)
            for (var i = x + 1, j = y + 1; i < 21, j < 21; i++, j++) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count4++;
            }
            for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
                if (chess[i][j] !== 2) {
                    break;
                }
                count4++;
            }
            if (count1 == 5 || count2 == 5 || count3 == 5 || count4 == 5) {
                alert("电脑胜");
                go = false;
                console.log("白方胜");
            }
        }
    }

    function comGo(x, y, bw) {    //弱智电脑的函数
        let mycount1 = 0,
            mycount2 = 0,
            mycount3 = 0,
            mycount4 = 0,
            myScores = 0,
            comScores = 0;
            mx11 = -1, mx21 = -1, mx31 = -1, mx41 = -1;
            mx12 = -1, mx22 = -1, mx32 = -1, mx42 = -1;
            my11 = -1, my21 = -1, my31 = -1, my41 = -1;
            my12 = -1, my22 = -1, my32 = -1, my42 = -1;
            // cx11, cx21, cx31, cx41;
            // cx12, cx22, cx32, cx42;
            // cy11, cy21, cy31, cy41;
            // cy12, cy22, cy32, cy42;

        //左右
        for (var i = x + 1; i < 21; i++) {
            if (chess[i][y] !==  1) {
                if (chess[i][y] == 2) {
                    break;
                }
                mx11 = i;
                my11 = y;
                break;
            }
            mycount1++;
        }
        for (var i = x; i >= 0; i--) {
            if (chess[i][y] !==  1) {
                if (chess[i][y] == 2) {
                    break;
                }
                mx12 = i;
                my12 = y;
                break;
            }
            mycount1++;
        }
        //上下
        for (var i = y + 1; i < 21; i++) {
            if (chess[x][i] !==  1) {
                if (chess[x][i] == 2) {
                    break;
                }
                mx21 = x;
                my21 = i;
                break;
            }
            mycount2++;
        }
        for (var i = y; i >= 0; i--) {
            if (chess[x][i] !==  1) {
                if (chess[x][i]) {
                    break;
                }
                mx22 = x;
                my22 = i;
                break;
            }
            mycount2++;
        }
        //斜线（左下右上）
        for (var i = x + 1, j = y - 1; i < 21, j >= 0; i++, j--) {
            if (chess[i][j] !== 1) {
                if (chess[i][j]) {
                    break;
                }
                mx31 = i;
                my31 = j;
                break;
            }
            mycount3++;
        }
        for (var i = x, j = y; i >= 0, j < 21; i--, j++) {
            if (chess[i][j] !== 1) {
              if (chess[i][j]) {
                  break;
              }
              mx32 = i;
              my32 = j;
              break;
            }
            mycount3++;
        }
        //反斜线（左上右下)
        for (var i = x + 1, j = y + 1; i < 21, j < 21; i++, j++) {
            if (chess[i][j] !== 1) {
              if (chess[i][j]) {
                  break;
              }
              mx41 = i;
              my41 = j;
              break;
            }
            mycount4++;
        }
        for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
            if (chess[i][j] !== 1) {
              if (chess[i][j]) {
                  break;
              }
              mx42 = i;
              my42 = j;
              break;
            }
            mycount4++;
        }

        let t = Math.max(mycount1, mycount2, mycount3, mycount4);
        switch (t) {
            case 1: myScores = 100;
                    if (mycount1 == 1) {
                        if (mx11 < 0 && my11 < 0) {
                            drawChess(mx12, my12, bw);
                            isWin2(mx12, my12, bw);
                        } else {
                            drawChess(mx11, my11, bw);
                            isWin2(mx11, my11, bw);
                        }
                    } else if (mycount2 == 1) {
                        if (mx21 < 0 && my21 < 0) {
                            drawChess(mx22, my22, bw);
                            isWin2(mx22, my22, bw);
                        } else {
                            drawChess(mx21, my21, bw);
                            isWin2(mx21, my21, bw);
                        }
                    } else if (mycount3 == 1) {
                        if (mx31 < 0 && my31 < 0) {
                            drawChess(mx32, my32, bw);
                            isWin2(mx32, my32, bw);
                        } else {
                            drawChess(mx31, my31, bw);
                            isWin2(mx31, my31, bw);
                        }
                    } else {
                        if (mx41 < 0 && my41 < 0) {
                            drawChess(mx42, my42, bw);
                            isWin2(mx42, my42, bw);
                        } else {
                            drawChess(mx41, my41, bw);
                            isWin2(mx41, my41, bw);
                        }
                    }
                    break;
            case 2: myScores = 200;
                    if (mycount1 == 2) {
                        if (mx11 < 0 && my11 < 0) {
                            drawChess(mx12, my12, bw);
                            isWin2(mx12, my12, bw);
                        } else {
                            drawChess(mx11, my11, bw);
                            isWin2(mx11, my11, bw);
                        }
                    } else if (mycount2 == 2) {
                        if (mx21 < 0 && my21 < 0) {
                            drawChess(mx22, my22, bw);
                            isWin2(mx22, my22, bw);
                        } else {
                            drawChess(mx21, my21, bw);
                            isWin2(mx21, my21, bw);
                        }
                    } else if (mycount3 == 2) {
                        if (mx31 < 0 && my31 < 0) {
                            drawChess(mx32, my32, bw);
                            isWin2(mx32, my32, bw);
                        } else {
                            drawChess(mx31, my31, bw);
                            isWin2(mx31, my31, bw);
                        }
                    } else {
                        if (mx41 < 0 && my41 < 0) {
                            drawChess(mx42, my42, bw);
                            isWin2(mx42, my42, bw);
                        } else {
                            drawChess(mx41, my41, bw);
                            isWin2(mx41, my41, bw);
                        }
                    }
                    break;
            case 3: myScores = 500;
                    if (mycount1 == 3) {
                        if (mx11 < 0 && my11 < 0) {
                            drawChess(mx12, my12, bw);
                            isWin2(mx12, my12, bw);
                        } else {
                            drawChess(mx11, my11, bw);
                            isWin2(mx11, my11, bw);
                        }
                    } else if (mycount2 == 3) {
                        if (mx21 < 0 && my21 < 0) {
                            drawChess(mx22, my22, bw);
                            isWin2(mx22, my22, bw);
                        } else {
                            drawChess(mx21, my21, bw);
                            isWin2(mx21, my21, bw);
                        }
                    } else if (mycount3 == 3) {
                        if (mx31 < 0 && my31 < 0) {
                            drawChess(mx32, my32, bw);
                            isWin2(mx32, my32, bw);
                        } else {
                            drawChess(mx31, my31, bw);
                            isWin2(mx31, my31, bw);
                        }
                    } else {
                        if (mx41 < 0 && my41 < 0) {
                            drawChess(mx42, my42, bw);
                            isWin2(mx42, my42, bw);
                        } else {
                            drawChess(mx41, my41, bw);
                            isWin2(mx41, my41, bw);
                        }
                    }
                    break;
            case 4: myScores = 1000;
                    if (mycount1 == 4) {
                        if (mx11 < 0 && my11 < 0) {
                            drawChess(mx12, my12, bw);
                            isWin2(mx12, my12, bw);
                        } else {
                            drawChess(mx11, my11, bw);
                            isWin2(mx11, my11, bw);
                        }
                    } else if (mycount2 == 4) {
                        if (mx21 < 0 && my21 < 0) {
                            drawChess(mx22, my22, bw);
                            isWin2(mx22, my22, bw);
                        } else {
                            drawChess(mx21, my21, bw);
                            isWin2(mx21, my21, bw);
                        }
                    } else if (mycount3 == 4) {
                        if (mx31 < 0 && my31 < 0) {
                            drawChess(mx32, my32, bw);
                            isWin2(mx32, my32, bw);
                        } else {
                            drawChess(mx31, my31, bw);
                            isWin2(mx31, my31, bw);
                        }
                    } else {
                        if (mx41 < 0 && my41 < 0) {
                            drawChess(mx42, my42, bw);
                            isWin2(mx42, my42, bw);
                        } else {
                            drawChess(mx41, my41, bw);
                            isWin2(mx41, my41, bw);
                        }
                    }
                    break;
            default: break;
        }
    }
};
