import App, { Container } from 'next/app'
import Layout from '../component/Layout'
import MyCoutext from '../lib/my-content'
import { Button } from 'antd'
import { Provider } from 'react-redux'
import TestHoc from '../lib/with-redux'
class MyApp extends App {
    state = {
        count: 1,
        context: 'value'
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
                <Layout>
                    <MyCoutext.Provider value={this.state.context}>
                        <Provider store={reduxStore}>
                            <Component {...pageProps}/>
                        </Provider>
                    </MyCoutext.Provider>
                    
                </Layout>
                
            </>
        )
    }
}
// import 'antd/dist/antd.css'
export default TestHoc(MyApp)