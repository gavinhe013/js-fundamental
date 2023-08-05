import { A_A } from './131-A.js'
import { B_B } from './131-B.js'



function C() {
    A_A()
    B_B()

    console.log('C');
}


// export {
//     C
// }

// 导出一个默认的方法，只能写一个 
export default C