window.onload = function () {
    if (typeof(Worker)!=="undefined") {
        let worker = new Worker('worker.js');
        let submit = document.querySelector('.submit');
        let res = document.querySelector('.res');
        submit.addEventListener('click', function () {
            let text = document.querySelector('.nums').value;
            let arr = new Array();
            arr = text.split(" ");
            let n = arr.length;
            let data = {
                str: arr,
                num: n
            }
            worker.postMessage(data);
            worker.onmessage = function (e) {
                console.log(e.data)
                let hhh = new Array(); 
                res.innerHTML = "我聪明吧";
                for (var i = 0; i < e.data.length; i++) {
                   hhh.push(e.data[i]);
                   res.innerHTML += hhh[i] + " ";
                }
            };
        });
    } else {
        alert("换个浏览器兄弟");
    }
    
}