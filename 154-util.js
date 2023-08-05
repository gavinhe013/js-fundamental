// 对象转字符串拼接操作，表单格式
function queryStringify(obj) {
    let str = '';
    for (let k in obj) str += `${k}=${obj[k]}&`
    // username=lucy&password=999&
    return str.slice(0, -1)
}

//  封装ajax
function ajax(options) {
    let defaultoptions = {
        url: "",
        method: "GET",
        async: true,
        data: {},
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function () { },
        error: function () { }
    }

    let { url, method, async, data, headers, success, error } = {
        ...defaultoptions,
        ...options
    }


    // ?.  可选链操作符 如果headers["content-type"]不存在，不会因为报错而终止代码执行
    if (typeof data === 'object' && headers["Content-Type"]?.indexOf("json") > -1) {
        // 如果content-type是json，那么就把对象转换成json字符串
        data = JSON.stringify(data)
    } else {
        // 如果content-type不是json，那么就是表单格式，需要把对象利用上面定义好的queryStringify方法转换成字符串
        data = queryStringify(data)
    }


    // 如果是get请求，并且有参数，那么直接组装url信息
    if (/^get$/i.test(method) && data) {
        // url中拼接处理好的字符串参数， 默认header中content-type为form格式，content-type不是json，变成表单格式，转成字符串然后拼接到url中
        url += "?" + data
    }


    // 发送请求
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onload = function () {
        if (!/^2\d{2}$/.test(xhr.status)) {
            error(`错误状态吗：${xhr.status}`) // 在这里把传进的函数进行回调
            return
        }

        // 执行解析
        try {
            let result = JSON.parse(xhr.responseText)
            success(result)
        } catch (err) {
            error('解析失败 ! 因为后端返回的结果不是json字符串格式')
        }
    }


    // 设置请求头部信息
    for (let k in headers) xhr.setRequestHeader(k, headers[k])
    // /.../i忽略大小写
    if (/^get$/i.test(method)) {
        // 如果是get请求，那么就不需要通过send发送信息，需要在url中拼接
        xhr.send()
    } else {
        // 如果是post请求，那么就需要send信息
        xhr.send(data)
    }
}



// 只暴露ajax方法
// export default ajax


// promise ajax
function pajax(options) {
    // 修改为es6写法
    return new Promise((resolve, reject) => {
        ajax({
            ...options,
            success(res) {
                resolve(res)
            },
            error(err) {
                reject(err)
            }
        })
    })

    // return q
}

// pajax().then(function () {

// }).catch(err => {

// })

export {ajax, pajax}