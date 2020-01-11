import axios from 'axios'
import { useEffect } from 'react'
import api from '../lib/api'
import { Button, Icon, Tabs } from 'antd'
import getCofnig from 'next/config'
import Repo from '../component/Repo'
import { connect } from 'react-redux'
import Router , { withRouter } from 'next/router'
// import LRU from 'lru-cache'

const { publicRuntimeConfig } = getCofnig()
let cachedUserRepos, cachedUserStaredRepos 
const isServer = typeof window === 'undefined'
function Index( { userRepos, userStaredRepos, user, router }) {

    console.log( userRepos, userStaredRepos, user )

    useEffect(() => {
        if (!isServer) {
        cachedUserRepos = userRepos
        cachedUserStaredRepos = userStaredRepos
        setTimeout(() => {
            cachedUserRepos = null
            cachedUserStaredRepos = null
          }, 1000 * 60 * 10)
        }
    }, [userRepos, userStaredRepos])

    const tabKey = router.query.key || '1'

    const handleTabChange = activeKey => {
        Router.push(`/?key=${activeKey}`)
    }

    if (!user || !user.id) {
        return (
        <div className="root">
            <p> 请先登录哦~</p>
            <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
            点击登录
            </Button>
            <style jsx>{`
            .root {
                height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            `}</style>
        </div>
        )
    }
    return  (
        <div className="root">
            <div className="user-info">
                <img src={user.avatar_url} alt="user avatar" className="avatar" />
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="location">
                    <Icon type="home"  style={{ marginRight: 10, marginTop:10 }} />
                    {user.location}
                </p>
                <p className="email">
                    <Icon type="mail" style={{ marginRight: 10 }} />
                    <a href="mailto:triumph_9431@qq.com">triumph_9431@qq.com</a>
                </p>
                <p className="url">
                    <Icon type="global" style={{ marginRight: 10 }} />
                    <a href="https://xkx9431.github.io/xkx_blog">Kevin's Blog</a>
                </p>
            </div>
            <div className="user-repos">
                {/* { userRepos.map( repo => (
                    <Repo repo = { repo }  />
                ) )} */}
                <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
                    <Tabs.TabPane tab="你的仓库" key="1">
                    {userRepos.map(repo => (
                        <Repo key={repo.id} repo={repo} />
                    ))}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="你关注的仓库" key="2">
                    {userStaredRepos.map(repo => (
                        <Repo key={repo.id} repo={repo} />
                    ))}
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <style jsx>{`
            .root {
                display: flex;
                align-items: flex-start;
                padding: 20px 0;
            }
            .user-info {
                width: 200px;
                margin-right: 40px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
            }
            .login {
                font-weight: 800;
                font-size: 20px;
                margin-top: 20px;
            }
            .name {
                font-size: 16px;
                color: #777;
            }
            .bio {
                margin-top: 20px;
                color: #333;
            }
            .avatar {
                width: 100%;
                border-radius: 5px;
            }
            .user-repos {
                flex-grow: 1;
            }
            `}</style>
        </div>
    )

}

Index.getInitialProps =async ({ ctx, reduxStore})=>{

    const user = reduxStore.getState().user
    console.log(reduxStore)
    if (!user || !user.id) {
        return {
        isLogin: false,
        }
    }

    const userRepos = await api.request(
        {
            url: '/user/repos',
        },
        ctx.req,
        ctx.res,
    )
    
    const userStaredRepos = await api.request(
        {
            url: '/user/starred',
        },
        ctx.req,
        ctx.res,
    )
    return {
        isLogin: true,
        userRepos: userRepos.data,
        userStaredRepos: userStaredRepos.data,
    }
}
export default withRouter(
    connect(function mapState(state) {
        return {
                user: state.user,
        }
    })( Index ),
) 