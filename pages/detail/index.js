import withRepoBasic from '../../component/with-repo-basic'
import api from '../../lib/api'
import MarkDownIt from 'markdown-it'
import 'github-markdown-css'
import MDRenderer from '../../component/MarkdownRender'
const md = new MarkDownIt({
    html: true,
    linkify: true
})

function b64_to_utf8(str){
    return decodeURIComponent(escape(atob(str)))
}
function Detail ({readme}) {
    const content = b64_to_utf8(readme.content)
    const html = md.render(content)
    return <div className='markdown-body'>
        <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
}
Detail.getInitialProps = async ({ ctx: {query: {owner, name}, req, res} }) => {
    const readmeResp = await api.request({
        url: `/repos/${owner}/${name}/readme`,
        
    }, 
    req,
    res
    )
    
    return {
        readme: readmeResp.data
    }
}
// import Repo from '../../component/Repo'
// import Link from 'next/link'
// import api from '../../lib/api'
// import { withRouter } from 'next/router'

// function makeQuery(queryObject){
//     const query = Object.entries(queryObject)
//     .reduce((result, entry) => {
//         result.push(entry.join('='))
//         return result
//     }, []).join('&')
//     return `?q=${query}`
// }
// function Detail({repoBasic, router}) {
//     console.log(repoBasic)
//     const query = makeQuery(router.query)
//     return  (
//         <div className="root">
//             <div className="repo-basic">
//                 <Repo repo={repoBasic}/>
//                 <div className='tabs'>
//                     <Link href={`/detail${query}`}>
//                         <a className='tab' className='index'>Readme</a>
//                     </Link>
//                     <Link href={`/detail/issues${query}`}>
//                         <a className='tab issues'>Issues</a>
//                     </Link>
//                 </div>
//             </div>
//             <div>Readme</div>
//             <style jsx>{`
//                 .root{
//                     padding-top: 20px;
//                 }
//                 .repo-basic{
//                     padding: 20px;
//                     border: 1px solid #eee;
//                     margin-bottom: 20px;
//                     border-radius: 5px;
//                 }
//                 .tab +.tab{
//                     margin-left: 20px
//                 }
//             `}</style>
//         </div>
//     )
// }

// Detail.getInitialProps = async ({router, ctx}) => {
//     // return new Promise((resolve) => {
//     //     setTimeout(() => {
//     //         resolve({})
//     //     }, 1000)
//     // })
//     const { owner, name } = ctx.query
//     const repoBasic = await api.request({
//         url: `/repos/${owner}/${name}`,
//     }, ctx.req, ctx.res)

//     return {
//         repoBasic: repoBasic.data
//     }
// }
export default withRepoBasic(Detail, 'index')