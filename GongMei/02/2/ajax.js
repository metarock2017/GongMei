//功能
function getJSON (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                let resJson = { code: xhr.status, response: xhr.response };
                reject(resJson);
            }
        }
        xhr.send();
    });
}

function postJSON(url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve( JSON.parse(xhr.responseText) );
            } else {
                let resJson = { code: xhr.status, response: xhr.response };
                reject(resJson);
            }
        }
        xhr.send(JSON.stringify(data)); 
    });
}
