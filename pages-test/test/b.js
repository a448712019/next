import {memo, useMemo, useState, useCallback} from 'react'
//优化
// 传入的组件如果传入的参数没有变就不会重新渲染

function Main() {
    const [count,setCount] = useState(0)
    //useMemo  只要对象参数没变 就不会重现渲染 
    const config = useMemo(() => ({
        text: `count${count}`,
        color: '123',
    }), [count])//跟useeffect数组效果一样
    //这个是不会重新生命一个新的函数
    const  abc = useCallback(() => dispatchCOunt({type: 'add'}), [])
    return <Component />
}

const Component =  memo((a, b) => {
    return <div></div>
})
export default Main