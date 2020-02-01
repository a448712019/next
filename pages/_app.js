import App, { Container } from 'next/app'
import Layout from '../component/Layout'
import { Button } from 'antd'
import { Provider } from 'react-redux'
import TestHoc from '../lib/with-redux'
import PageLoading from '../component/PageLoading'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
class MyApp extends App {
    state = {
        count: 1,
        context: 'value',
        loading: false
    }
    startLoading = () => {
        this.setState({
            loading: true
        })
    }
    stopLoading = () => {
        this.setState({
            loading: false
        })
    }
    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)

        // axios.get('https://api.github.com/search/repositories?q=react')
       
    }
    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }
    static async getInitialProps(ctx) {
        const { Component } = ctx;
        let pageProps
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps
        }
    }
    render () {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <> 
                <Provider store={reduxStore}>
                    {
                        this.state.loading ? 
                        <PageLoading /> 
                        : null
                    }
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
            </>
        )
    }
}
// import 'antd/dist/antd.css'
export default TestHoc(MyApp)