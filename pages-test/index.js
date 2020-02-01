import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { add } from '../store/store'
import getConfi from 'next/config'
import {  useEffect } from 'react'
import axios from 'axios'

const { publicRuntimeConfig } = getConfi()
const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete',
]

function makeEvent(type) {
    return (...args) => {
        // console.log(type, ...args)
    }
}

events.forEach(event => {
    Router.events.on(event, makeEvent(event))
})
const Index =  (props) => {

    useEffect(() => {
        // axios.get('/api/user/info').then(resp => console.log(resp))
    }, [])
    // console.log(props)
    function gotoTestB(){
        Router.push({
            pathname: '/test/b',
            query: {
                id: 2
            }
        }, '/test/b/2')
    }
    return (
        <>
            <span>COunt: {props.counter}</span>
            <a>username: {props.username}</a>
            <input value={props.username} onChange={ e => props.rename(e.target.value) }/>
            <button onClick={() => props.add(props.counter)}>do add</button>
            <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
        </>
    )
}
Index.getInitialProps = async ({reduxStore}) => {
    reduxStore.dispatch(add(3))
    return {}
}
export default connect(function mapStateToProps(state) {
    return {
        counter: state.counter.count,
        username: state.user.username
    }
}, function mapDispatchToProps(dispatch) {
    return {
        add: (num) => dispatch({type: 'ADD', num}),
        rename: (name) => dispatch({type: 'UPDATE_USERNAME', name})
    }
})(Index)