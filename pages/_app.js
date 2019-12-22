import App ,{ Container }from 'next/app'
import Layout from '../component/layout'

import 'antd/dist/antd.css'

class MyApp extends App{
    static async getInitialProps({ Component,ctx }) {
        // let pageProps
        // if (Component.getInitialProps){
        //     pageProps = await Component.getInitialProps()
        // } else {
        //     pageProps = { nothing: "nothing__" }
        // }
        // return  { pageProps } 
        const pageProps = await Component.getInitialProps(ctx)
        return  { pageProps}
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        )
    }

}

export default MyApp