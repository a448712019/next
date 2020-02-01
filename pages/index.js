import { Button, Icon, Tabs } from 'antd'
import getConfig from 'next/config'
import { useEffect } from 'react'
import Router,{ withRouter } from 'next/router'
import { connect } from 'react-redux'
import LRU from 'lru-cache'
import { cacheArray } from '../lib/repo-basic-cache'
import Repo from '../component/Repo'
const { publicRuntimeConfig } = getConfig()
const api = require('../lib/api')
const isServer = typeof window === 'undefind'
const cache = new LRU({
    maxAge: 1000 * 60 * 10
})
let catchedUserRepos, catchedUserStaredRepos
function Index({userRepos, userStaredRepos, user, router}) {
    const tabKey = router.query.key || '1'
    const handleTabChange = (activeKey) => {
        Router.push(`/?key=${activeKey}`)
    }
    useEffect(() => {
        if(!isServer){
            // catchedUserRepos = userRepos
            // catchedUserStaredRepos = userStaredRepos
            cache.set('userRepos', userRepos)
            cache.set('userStaredRepos', userStaredRepos)
            if(userRepos){
                cache.set('userRepos', userRepos)
            }
            if(userStaredRepos){
                cache.set('userStaredRepos', userStaredRepos)
            }
        }
    }, [userRepos, userStaredRepos])

    useEffect(() => {
        if(!isServer){
            cacheArray(userRepos, userStaredRepos)
        }
    })
    if(!user || !user.id){
        return <div className='root'>
            <p>亲,您还未登录~</p>
            <Button type='primary' href={publicRuntimeConfig.OAUTH_URL}>点击登录</Button>
            <style jsx>{`
                .root{
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }    
            `}</style>
        </div>
    }
    console.log(userRepos, userStaredRepos)
    return <div className='root'>
        <div className='user-info'>
            <img src={user.avatar_url} alt='user avatar' className='avatar'/>
            <span className='login'>{user.login}</span>
            <span className='name'>{user.name}</span>
            <span className='bio'>{user.bio}</span>
            <p className='email'>
                <Icon type='mail' style={{marginRight: 10}}/>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
        </div>  
        <div className='user-repos'>
            <div className="user-repos">
                
                <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
                <Tabs.TabPane tab='你的仓库' key='1'>
                    {
                        userRepos.map(repo => <Repo key={repo.id} repo={repo}/>)
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='你关注的仓库' key='2'>
                    {
                        userStaredRepos.map(repo => <Repo key={repo.id} repo={repo}/>)
                    }
                </Tabs.TabPane>
            </Tabs>
            </div>
            
        </div>
        <style jsx>{`
            .root{
                padding: 20px 0;
                display: flex;
                align-items: flex-start;
            }    
            .user-info{
                width: 200px;
                margin-right: 40px;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
            }
            .login{
                font-weight: 800;
                font-size: 20px;
                margin-top: 20px;
            }
            .name{
                font-size: 16px;
                color: #777;
            }
            .bio{
                margin-top: 20px;
                color: #333
            }
            .avatar{
                width: 100%;
                border-radius: 5px;
            }
            .user-repos{
                flex-grow: 1
            }
        `}</style>
    </div>
}


Index.getInitialProps = async ( {ctx, reduxStore} ) => {
    //    const result =  axios.get('/github/search/repositories?q=react')
    //     .then(resp => console.log(resp))
    const user = reduxStore.getState().user
    if(!user || !user.id){
        return {
            isLogin: false
        }
    }
    if(!isServer){
        if(cache.get('userRepos') && cache.get('userStaredRepos')){
            return {
                userRepos: cache.get('userRepos'),
                userStaredRepos: cache.get('userStaredRepos')
            }
        }
    }
   

    const userRepos = await api.request( {
        // url: '/search/repositories?q=react',
        url: '/user/repos',
    }, ctx.req, ctx.res)
    const userStaredRepos = await api.request( {
        // url: '/search/repositories?q=react',
        url: '/user/starred',
    }, ctx.req, ctx.res)


  
    return {
        userRepos: userRepos.data,
        userStaredRepos: userStaredRepos.data,
        isLogin: true
    }
}

export default withRouter(connect(function mapState(state){
    return {
        user: state.user
    }
})(Index))