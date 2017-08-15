function ajax(json) {
    // 创建ajax对象
    let pro = document.getElementById('progress');
    let xhr = null; 
    let methor = json.methor || 'get';
    let url = json.url;
    let asyn = json.asyn ? true : json.asyn == false ? false : true;
    let data = json.data || '';
    let success = json.success;
    let error = json.error;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    if (methor.toLowerCase() === 'get'){
        xhr.open(methor,url,asyn);
        url += '?' + data + '&' + new Date().getTime();
    }
    if (methor.toLowerCase() === 'post') {
            xhr.open(methor, url, asyn);
            xhr.setRequestHeader("Content-Type", "application/json");
    }

    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success && success(xhr.responseText);
            } else {
                if(error){
                    error && error();
                }
            }
        }
    };
    xhr.send(data);
}
