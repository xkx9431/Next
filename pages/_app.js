import App, { Container } from 'next/app'
import { Router } from 'next/router'
import Link from 'next/link'
import { Provider } from 'react-redux'
import testHoc from '../lib/with-redux'
import axios from 'axios'
import 'antd/dist/antd.css'

import Layout from '../component/Layout'
import PageLoading from '../component/PageLoading'



class MyApp extends App {
  state = {
    context: 'value',
    loading:false
  }

  static async getInitialProps(ctx) {
    const { Component } = ctx
    console.log('app init')
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps,
    }
  }

  startLoading = ()=>{
    this.setState({
      loading:true
    })
  }
  stopLoading = ()=>{
    this.setState({
      loading:false
    })
  }
  componentDidMount(){
    Router.events.on('routerChangeStart', this.startLoading)
    Router.events.on('routerChangeComplete', this.stopLoading)
    Router.events.on('routerChangeError', this.stopLoading)

    axios
    .get('/github/search/repositories?q=react')
    .then(resp=>console.log(resp))
  }

  componentWillUnmount(){
    Router.events.off('routerChangeStart', this.startLoading)
    Router.events.off('routerChangeComplete', this.stopLoading)
    Router.events.off('routerChangeError', this.stopLoading)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
          <Provider store={reduxStore}>
            {this.state.loading? <PageLoading/>:null }
            <Layout>
              <Link href="/">
                <a> Index </a>
              </Link>
              <Link href="/detail">
                <a> Detail </a>
              </Link>
              <Component {...pageProps} />
            </Layout>
          </Provider>
      </>
    )
  }
}

export default testHoc(MyApp)
