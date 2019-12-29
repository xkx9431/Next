import Link from 'next/link'
import {Button,Layout,Icon,Input,Avatar} from 'antd'
import { useState,useEffect,useCallback } from 'react'
import Container from './Container'
import getConfig from 'next/config'

const { Header, Content, Footer} = Layout
const { publicRuntimeConfig} = getConfig()


export default ({ children }) => {

    const [search,setSearch] = useState('')

    const handleSearchChange = useCallback((event)=>{
        setSearch(event.target.value)
    })

    const handleOnSearch = useCallback(()=>{},[])

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
                            <a href={publicRuntimeConfig.OAUTH_URL}>
                                <Avatar size={40} icon ="user"/>
                            </a>
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