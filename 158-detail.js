// 拿列表传进来的数据

// 方法1. 截取url中的id
// console.log(location.href.split("=")[1])

// 方法2. 通过URL构造函数，获取url中的参数
var obj = new URL(location.href)
var id = obj.searchParams.get("id")

class Detail {
    constructor(id) {
        this.id = id
        this.init()
    }

    async init() {
        // 获取数据
        var info = await this.getList()
        // 渲染页面
        this.renderHTML(info)
    }

    async getList() {
        var res = await fetch(`http://localhost:3000/goods/${this.id}`)
        var info = await res.json()
        return info
    }

    renderHTML(info) {

        // 通过结构的方式，把数据中的属性提取出来
        var {title, feature, price, desc} = info

        var oh1 = document.querySelector("h1")
        var ofeature = document.querySelector(".feature")
        var oprice = document.querySelector(".price")
        var olist = document.querySelector(".list")

        oh1.innerHTML = title
        ofeature.innerHTML = feature
        oprice.innerHTML = `<span style="color:red">price: ${price}CNY</span>`

        olist.innerHTML = desc.map(item => `
            <li>
                <img src="${item}" alt="">
            </li>
        `).join("")
    }
}

new Detail(id)