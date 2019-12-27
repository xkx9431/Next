import Document,{ Html,Head, Main, NextScript } from 'next/document'
import { Component } from 'react'
import { ServerStyleSheet} from 'styled-components'

class MyDocument extends Document{

    static async getInitialProps(ctx){
        const originalRenderPage = ctx.RenderPage
        const sheet  = new ServerStyleSheet()    
        try{
            ctx.RenderPage = () =>originalRenderPage({
                enhanceApp:App =>(props)=> sheet.collectStyles(<App {...props} />),
                enhanceComponent: Component=>Component
            })
            const props = await Document.getInitialProps(ctx)

            return {
                ...props,
                styles: <>
                {props.styles}{sheet.getStyleElement()}
                </>
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        return (
            <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument