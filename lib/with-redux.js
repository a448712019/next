import createStore from '../store/store'
import React from 'react'
const isServer = typeof window === 'undefined'
const __NEXR_REDUX_STORE = '__NEXR_REDUX_STORE'

function getOrCreateStore(initialState){
    if(isServer){
        return createStore(initialState)
    }
    if(!window[__NEXR_REDUX_STORE]){
        window[__NEXR_REDUX_STORE] = createStore(initialState)
    }
    return window[__NEXR_REDUX_STORE]
}
export default (Comp) => {
    class WithReduxApp extends React.Component{
        constructor(props) {
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
        render() {
            const {Component, pageProps, ...rest} = this.props
            // const name = name + '213'
            if(pageProps){
                pageProps.test = 123
            }
            // console.log(Component, pageProps)
            
            return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore}/>
        }
    }
    
    WithReduxApp.getInitialProps = async (ctx) => {
        
        let reduxStore 

        if(isServer){
            const { req } = ctx.ctx
            const session = req.session
            if(session && session.userInfo){
                reduxStore = getOrCreateStore({
                    user: session.userInfo
                })
            }else{
                reduxStore = getOrCreateStore()
            }
        }else{
            reduxStore = getOrCreateStore()
        }
        ctx.reduxStore = reduxStore
        let appProps = {}
        if(typeof Comp.getInitialProps === 'function'){
            appProps = await Comp.getInitialProps(ctx)
        }
        return {
            ...appProps,
            initialReduxState: reduxStore.getState()
        }
    }
    return WithReduxApp
}