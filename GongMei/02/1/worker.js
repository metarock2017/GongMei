self.addEventListener('message', function (e) {
    let g = e.data.str.length;
    let hhh = new Array();
    for (var i = 0; i < g; i ++) {
        hhh[i] = e.data.str[i];
    }
    let min;
    for (let i = 0; i < g; i ++) {
        min = i;
        for (let j = i + 1; j < g; j ++) {
            if (hhh[i] < hhh[j]) {
                min = j;
            }
        }
        if (min != i) {
            let t = hhh[i];
            hhh[i] = hhh[min];
            hhh[min] = t;
        }
    }
    self.postMessage(hhh);
}, false);