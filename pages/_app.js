import App ,{ Container }from 'next/app'
import Layout from '../component/layout'

import 'antd/dist/antd.css'

class MyApp extends App{
    static async getInitialProps({ Component,ctx }) {
        let pageProps
        if ( !Component.getInitialProps){
            Component.getInitialProps = (ctx)=> { ctx }
        } 
        pageProps = await Component.getInitialProps(ctx)
        return  { pageProps } 
    }

    render() {
        const { Component, pageProps } = this.props
        return (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        )
    }

}

export default MyApp