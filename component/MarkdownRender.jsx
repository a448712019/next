import MarkDownIt from 'markdown-it'
import {useMemo, memo} from 'react'
import 'github-markdown-css'
const md = new MarkDownIt({
    html: true,
    linkify: true
})
function b64_to_utf8(str){
    return decodeURIComponent(escape(atob(str)))
}
export default memo(function MarkDownRender({context, isBase64}) {
    const markdown = isBase64 ? b64_to_utf8(context) : content
    const html = useMemo(() => md.render(markdown), [markdown])
    return <div className='markdown-body'>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
})
