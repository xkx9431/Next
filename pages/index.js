import axios from 'axios'
import { useEffect } from 'react'
import api from '../lib/api'

function Index() {
    return  <span>index</span>
    // useEffect(()=>{
    //     axios.post('github/test', {test:123} )
    // })
}

Index.getInitialProps =async ({ctx})=>{
    // const result = await axios
    // .get('')
    // .then(res=>{console.log(res)})
    const result =await api.request( {
        url:'/search/repositories?q=react'},
        ctx.req,ctx.res)
    return {
        data:result.data
    }
}
export default Index