function B1() {
    _b_common()
    console.log('B1-布局创建')
}

function B2() {
    _b_common()
    console.log('B2-布局创建')
}


// 通过在方法前加上下划线_，表示这个方法是私有的，不对外暴露，但是并不是真正的私有方法
function _b_common() {
    console.log('b_common')
}



function test() {
    console.log('B1-test')
}



function B_B() {
    console.log('B_B');
}