import Comp from'../component/comp'
import Link from 'next/link'
import { withRouter } from 'next/router'

const A =  ({router,name}) => {
    return (<div>
                <Comp>A {router.query.id}</Comp>
                <Link href ="#aaa"><a> {name}</a></Link>
            </div>)
}
A.getInitialProps = ()=>{
    return {
        name:'xkx'
    }
}

export default withRouter(A)