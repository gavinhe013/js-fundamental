// function Tabs(select, type) {
//     // 使用变量container来接收传入的selector，因为只用一次，所以不需要使用this
//     let container = document.querySelector(select);
//     // 使用this来接收container中的所有header中的li元素，因为如果要在其他地方使用，比如原型中，需要使用this，否则因为作用域问题，无法访问到
//     this.oHeaderItems = container.querySelectorAll(".header li");
//     this.oBoxItems = container.querySelectorAll(".box li");

//     // 为了使原型中的方法可以访问到type，所以需要用this.type来接收事件类型
//     this.type = type;

//     // 在实例化的时候，就调用change方法，省去了在外部调用的步骤
//     this.change()
// }

// Tabs.prototype.change = function () {

//     // 这里的this指向的是实例对象
//     for (let i = 0; i < this.oHeaderItems.length; i++) {

//         // 因为要接收事件类型，所以使用dom2级事件绑定
//         this.oHeaderItems[i].addEventListener(this.type, () => {

//             // console.log(this);// 这里的this指向的是当前点击的li元素，因为是在事件函数中，所以this指向的是当前事件的触发者
//             // 但是需要的是让this指向的是实例对象，所以需要使用箭头函数，让this指向的是父级的this，即实例对象

//             for (let j = 0; j < this.oHeaderItems.length; j++) {
//                 this.oHeaderItems[j].classList.remove("active");
//                 this.oBoxItems[j].classList.remove("active");
//             }

//             this.oHeaderItems[i].classList.add("active");
//             this.oBoxItems[i].classList.add("active");
//         })
//     }
// }

class Tabs {

    constructor(select, type) {
        // 使用变量container来接收传入的selector，因为只用一次，所以不需要使用this
        let container = document.querySelector(select);
        // 使用this来接收container中的所有header中的li元素，因为如果要在其他地方使用，比如原型中，需要使用this，否则因为作用域问题，无法访问到
        this.oHeaderItems = container.querySelectorAll(".header li");
        this.oBoxItems = container.querySelectorAll(".box li");

        // 为了使原型中的方法可以访问到type，所以需要用this.type来接收事件类型
        this.type = type;

        // 在实例化的时候，就调用change方法，省去了在外部调用的步骤
        this.change()
    }


    change() {

        // 这里的this指向的是实例对象
        for (let i = 0; i < this.oHeaderItems.length; i++) {

            // 因为要接收事件类型，所以使用dom2级事件绑定
            this.oHeaderItems[i].addEventListener(this.type, () => {

                // console.log(this);// 这里的this指向的是当前点击的li元素，因为是在事件函数中，所以this指向的是当前事件的触发者
                // 但是需要的是让this指向的是实例对象，所以需要使用箭头函数，让this指向的是父级的this，即实例对象

                for (let j = 0; j < this.oHeaderItems.length; j++) {
                    this.oHeaderItems[j].classList.remove("active");
                    this.oBoxItems[j].classList.remove("active");
                }

                this.oHeaderItems[i].classList.add("active");
                this.oBoxItems[i].classList.add("active");
            })
        }
    }

}


export default Tabs