// import Comp from '../component/comp'
import { withRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from 'styled-components'
// import moment from 'moment'
const Title = styled.h1`
    color: red
`
const color = '#234132'
const Comp = dynamic(import('../component/comp'))
const A = ({ router, name, time }) => (
    <>
        <Title>this is Title {time}</Title>
        <Comp />
        <Link href='#aaa'>
            <a className='link'>
                A{router.query.id} {name}</a>
        </Link>
        <style jsx>{`
            a{
                color: blue
            }
            .link{
                color: red
            }
        `}</style>
        <style jsx global>
            {`
                a{
                    color: ${color}
                }
            `}
        </style>
    </>
)

A.getInitialProps = async (ctx) => {
    const moment = await import('moment')
    const promise = new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle({
                name: 'jocky',
                time: moment.default(Date.now() - 60 * 1000).fromNow()
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(A)