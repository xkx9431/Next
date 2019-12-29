import Comp from'../component/comp'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Title = styled.h3`
color:blue;
font-size:20px;
`

const A =  ({router,name,time}) => {
    return (
    <>
        <Title> This is {time} </Title>
        <Comp>A {router.query.id}</Comp>
        <Link href ="#aaa"><a> {name}</a></Link>
        <style jsx>
            {`
            a {
                color: red;
            }
            `}
        </style>
    </>
    )
}
A.getInitialProps = async (ctx)=>{
const moment = await import("moment")
    const promise = new Promise((resolve) =>{
        setTimeout(()=>{
            resolve({
                name:"xkx",
                time:moment.default(Date.now()-60*1000).fromNow()
            })
        },500)
    })
    return await promise
}

export default withRouter(A)