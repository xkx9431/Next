import Comp from'../component/comp'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Title = styled.h3`
color:yellow;
font-size:20px;
`

const A =  ({router,name}) => {
    return (
    <>
        <Title> This is Title</Title>
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
    const promise = new Promise((resolve) =>{
        setTimeout(()=>{
            resolve({
                name:"xkx"
            })
        },500)
    })
    return await promise
}

export default withRouter(A)