import Comp from'../component/comp'
import Link from 'next/link'
import { withRouter } from 'next/router'

const A =  ({router,name}) => {
    return (<div>
                <Comp>A {router.query.id}</Comp>
                <Link href ="#aaa"><a> {name}</a></Link>
            </div>)
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