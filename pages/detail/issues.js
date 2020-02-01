import withRepoBasic from '../../component/with-repo-basic'
import api from '../../lib/api'
function Issues ({issues}) {
    console.log('text', issues)
return <span>Issues Index </span>
}
Issues.getInitialProps = async ({ctx}) => {
    const { owner, name } = ctx.query

    const issuessResp = await api.request({
        url: `/repos/${owner}/${name}/issues`
    },
    ctx.req,
    ctx.res)
    return {
        issues: issuessResp.data
    }
}

export default withRepoBasic(Issues, 'issues')