import Link from 'next/link'
import {Button} from 'antd'

export default ({ children }) => (
    <>
        <header>
            <Link href="/a?id=1" as ="/a/1" >
                    <Button> Goto_A </Button>
            </Link>
            <Link href="/test/b"  >
                    <Button> Goto_B </Button>
            </Link>
        </header>
        { children }
    </>
    )