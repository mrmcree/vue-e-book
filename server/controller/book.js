var http = require('../http').http
var cheerio = require('cheerio')
async function getBook(ctx){
    let {url}=ctx.params
    // console.log(url)
    var result=await http(`${url}`).then((res) => {
        var $ = cheerio.load(res.data);
        var contents=$('#J_content')
        var title=contents.find('.title span').eq(0).text()
        var chapter=contents.find('.title .current-chapter').text()
        var content=contents.find('.content .inner-text').html()
        var prev=$('#J_rightToolBar .prev').attr('href')
        var next=$('#J_rightToolBar .next').attr('href')
        // console.log(prev,next)
        return {
            title,
            content,
            chapter,
            prev,
            next
            
        }
    })
    ctx.body=result
    
}
module.exports={
    getBook
    
}