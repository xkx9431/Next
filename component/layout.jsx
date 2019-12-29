import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import {Layout,Icon,Input,Avatar,Tooltip,Dropdown,Menu} from 'antd'
import { useState,useEffect,useCallback } from 'react'
import axios from 'axios'
import {connect } from 'react-redux'
import Container from './Container'
import getConfig from 'next/config'
import {logout} from '../store'

const { Header, Content, Footer} = Layout
const { publicRuntimeConfig} = getConfig()

function MyLayout({ children, user, logout,router }) {

    const iconStyle = {
        color:'white',
        fontSize:40,
        display:'block',
        paddingTop:10,
        paddingRight:20
    }

    const  footerStyle = {
        textAlign:'center'
    }

    const [search,setSearch] = useState('')

    const handleSearchChange = useCallback((event)=>{
        setSearch(event.target.value)
    },[setSearch])

    const handleOnSearch = useCallback(()=>{},[])

    const handleAvatarClick = useCallback(e => {
        e.preventDefault()
    }, [])
    const handleLogout = useCallback(() => {
        logout()
    },[logout])

    const handleGotoOAuth = useCallback((e)=>{
        e.preventDefault()
        axios.get(`/prepare-auth?url=${router.asPath}`)
        .then(
            resp=>{
            if(resp.status===200){
                location.href = publicRuntimeConfig.OAUTH_URL
            }else{
                console.log('prepar before oauth fail,' + resp)
            }
        }
        ).catch(err=>{
            console.log(err)
        })
    },
    [])


    const userDropdown = (
        <Menu>
        <Menu.Item>
            <a href="javascript:void(0)" onClick={handleLogout}>
            登出
            </a>
        </Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Header>
                <div className="header-inner">
                    <div className ="header-left">
                        <div className="logo">
                            <Icon type="github" style={iconStyle}/>
                        </div>
                        <div>
                            <Input.Search placeholder="search for repos" 
                            value={search}
                            onChange={handleSearchChange}
                            onSearch = {handleOnSearch}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                                {user && user.id ? (
                                    <Dropdown overlay={userDropdown}>
                                    <a href={`/prepare-auth?url=${router.asPath}`} onClick={handleAvatarClick}>
                                        <Avatar size={40} src={user.avatar_url} />
                                    </a>
                                    </Dropdown>
                                ) : (
                                    <Tooltip title="Click for Login">
                                    <a href={publicRuntimeConfig.OAUTH_URL}
                                    onClick = {handleGotoOAuth}>
                                        <Avatar size={40} icon="user" />
                                    </a>
                                    </Tooltip>
                    )}
                        </div>
                    </div>
                </div>
            </Header>
            <Content>
                <div className="content">
                    <Container>{children}</Container>
                </div>
            </Content>
            <Footer style={footerStyle}>
                Develop by <strong>許凯旋</strong> @<a href="mailto:triumph_9431@qq.com">triumph_9431@qq.com</a>  All Rights reserved
            </Footer>
            <style jsx>{`
            .header-inner{
                display:flex;
                justify-content:space-between;
            }

            .header-left{
                display:flex;
                justify-content:flex-start
            }
            `}
            </style>
            <style jsx global>{`
                #__next {
                    height:100%;
                }
                .ant-layout {
                    height:100%;
                }
            `}
            </style>
        </Layout>
        )
} 

export default connect(function mapState(state){
    return {
        user:state.user,
    }
},function mapReducer(dispatch){
    return{
        logout:()=>dispatch(logout())
    }
})(withRouter(MyLayout))