// 面向过程
// 获取数据

var current = 0 // 记录当前页数
var isLoading = false // 记录是否正在请求 (防止多次请求)
var total = 0 // 设置全局变量，记录数据的总条数 

getList()

async function getList() {
    current++
    // _page 代表当前页数， _limit 代表每页显示的条数
    var res = await fetch(`http://localhost:3000/goods?_page=${current}&_limit=5`)

    // 在response header中，通过X-Total-Count可以获取到数据的总条数，通过headers中的get方法获取
    console.log(res.headers.get("X-Total-Count")); // 获取json-server中数据的总条数
    total = Number(res.headers.get("X-Total-Count")) // 但是拿到的total是字符串格式，需要转换成数字格式

    var list = await res.json()
    // console.log(list);
    renderHTML(list)

    return list
}

function renderHTML(arr) {
    for (let i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        // 通过字符串拼接的方式，把图片的相对路径和服务器地址拼接起来，就可以访问到图片了
        // 图片位于public/images/ 下面，json-server会自动把public文件夹下面的文件暴露出去，所以可以直接访问，不需要再加public
        oli.innerHTML = `<img src="http://localhost:3000${arr[i].poster}" alt="">
                        <h3>${arr[i].title}</h3>`

        // 事件绑定, 点击跳转到详情页
        oli.onclick = function () {

            // console.log(arr[i].id);
            // 跳转, 通过拼接的方式，把id传递到详情页地址中
            location.href = `./158-大案例-detail.html?id=${arr[i].id}`
        }

        list.appendChild(oli)
    }
}



window.onscroll = function () {

    console.log(list.children.length, total);
    // 如果最后一条数据已经拿到了，就直接结束，否则会无限触发
    // 通过判断list的子元素的个数，如果已经加载了全部的数据，就不需要再加载更多了
    if (list.children.length === total) {
        return
    }


    var listHeight = list.offsetHeight // list的高度
    var listTop = list.offsetTop // list距离顶部的距离

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条滚动的距离
    var windowHeight = document.documentElement.clientHeight // 窗口的高度

    if (isLoading) {
        // 如果已经加载过更多页面了，就不要再加载了
        return
    }

    // 如果这里的判断条件设置为两者距离 === ， 那么就不需要引入isLoading变量， 因为只会严格判断一次 
    // (listHeight + listTop) 因为不断的加载更多页面内容，所以这个值会不断的增加，可以进行更多的触发判断
    if ((listHeight + listTop) - Math.round(windowHeight + scrollTop) < 50) {
        console.log("加载更多");

        // 通过引入isLoading变量，控制不要多次加载更多页面
        isLoading = true

        // 通过getList()函数，获取下一页数据，且自动渲染页面
        // 不需要拿到返回值，只需要异步结束之后，渲染页面之后，把isLoading变量改为false
        getList().then(() => {
            isLoading = false
        })
    }
}