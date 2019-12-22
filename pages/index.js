import Link from 'next/link'
import { Button } from 'antd'
import Router from 'next/router'


export default ()=> {

    function gotoTest_B() {
        // console.log('button B has been clicked')
        Router.push({
            pathname:"/test/b",
            query:{
                id : 2
            }
        },'/b/2')
    }
    return (
        <div>
            <Link href="./a?id=1" as ="/a/1" >
                <Button> Goto_A </Button>
            </Link>
            <Button onClick = { gotoTest_B }> to test/b </Button>
        </div>
    )
} 