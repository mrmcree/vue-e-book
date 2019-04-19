var http = require('../http').http
var cheerio = require('cheerio')
module.exports = {
    async getCategoryInfo(ctx) {
        let { gender,page,major }=ctx.query
        // console.log(ctx)
         let result=await http(`category?gender=${gender}&type=hot&major=${major}&&page=${page}`).then((res) => {
                var $ = cheerio.load(res.data);
                var books = $('.container .books-list a');
                var maleBookData = []
                books.each((index, value) => {
                    var cover = books.eq(index).find('img').attr('src');
                    var name = books.eq(index).find('.right .name span').text()
                    var author = books.eq(index).find('.right .author span').eq(0).text()
                    var desc = books.eq(index).find('.right .desc').text()
                    var renqi = books.eq(index).find('.right .popularity span').eq(0).text()
                    var liucun = books.eq(index).find('.right .popularity span').eq(2).text()
                    var id=books.eq(index).attr('href').replace('/book/','')
                    var data = {
                        cover,
                        name,
                        author,
                        desc,
                        renqi,
                        liucun,
                        id
                    }
                    maleBookData.push(data)
                })
                return maleBookData
            })
        
        
        ctx.body=result
    }
}
