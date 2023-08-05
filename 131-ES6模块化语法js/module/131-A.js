function A1() {
    _a_common()
    console.log('A1-布局创建')
}

function A2() {
    _a_common()
    console.log('A2-布局创建')
}


// 通过在方法前加上下划线_，表示这个方法是私有的，不对外暴露，但是并不是真正的私有方法
function _a_common() {
    console.log('a_common')
}



function test() {
    console.log('A1-test')
}



function A_A() {
    console.log('A_A');
}



// 对于想要暴露的方法，可以通过export关键字导出
export {
    // A1: A1,
    A1,
    A2,
    test,
    A_A
}