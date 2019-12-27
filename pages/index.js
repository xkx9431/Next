import Link from 'next/link'
import { Button } from 'antd'
import Router from 'next/router'
import { useEffect } from 'react'
import { add } from '../store'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig} = getConfig()

const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete',
]

function makeEvent(type){
    return (...args)=>{
        console.log(type,...args)
    }
}
events.forEach(event => {
    Router.events.on(event, makeEvent(event))
})

const Index = ({counter,username,rename,add})=>{
    function gotoTestB() {
        Router.push(
        {
            pathname: '/test/b',
            query: {
            id: 2,
            },
        },
        '/test/b/2',
        )
    }

    useEffect(() => {
        axios.get('/api/user/info').then(resp => console.log(resp))
    }, [])
    
    
    return (
        <>
            <span>Count: {counter}</span>
            <a>UserName: {username}</a>
            <input value={username} onChange={e => rename(e.target.value)} />
            <button onClick={() => add(counter)}>do add</button>
            <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
            </>
        )
}

Index.getInitialProps = async ({ reduxStore }) => {
    return {}
}

export default connect(
    function mapStateToProps(state) {
    return {
        counter: state.counter.count,
        username: state.user.username,
    }
    },
    function mapDispatchToProps(dispatch) {
    return {
        add: num => dispatch({ type: 'ADD', num }),
        rename: name => dispatch({ type: 'UPDATE_USERNAME', name }),
    }
    },
)(Index)
