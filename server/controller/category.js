var http = require('../http').http
var cheerio = require('cheerio')
var trace=require('../trace').parseURL
async function getCategory(ctx) {
        
        async function geturl(type){
            var result=await http(`category?gender=${type}`).then((res) => {
                var $ = cheerio.load(res.data);
                var el = $('.sort-cells a')
                var urls=[]
                var tags=[]
                el.each((index, value) => {
                    var url = el.eq(index).attr('href')
                    urls.push(url)
                    var tag = el.eq(index).text()    
                    tags.push(tag)
                })
                return {urls,tags}
               
            })
            return result
        }
        var male=await geturl('male').then(async function(res){
            var data=[]
           
            for(var i=0;i<res.urls.length;i++){
                var book=await http(res.urls[i]).then((responese) => {  
                    var html = cheerio.load(responese.data)
                    var book = html('.container .books-list a').eq(1).children('img').attr('src');
                    // console.log(res.tags)
                    data.push({
                        name:res.tags[i],
                        cover:book,
                        major:trace('major',res.urls[i])
                    })
                })
            }     
            return data
            
        })
        var female=await geturl('female').then(async function(res){
            var data=[]
           
            for(var i=0;i<res.urls.length;i++){
                var book=await http(res.urls[i]).then((responese) => {  
                    var html = cheerio.load(responese.data)
                    var book = html('.container .books-list a').eq(1).children('img').attr('src');
                    // console.log(res.tags)
                    data.push({
                        name:res.tags[i],
                        cover:book,
                        major:trace('major',res.urls[i])
                    })
                })
            }     
            return data
        })
        // console.log(male)
        var data={
            male,
            female
        }
        ctx.body=data
   



}

module.exports = {
    getCategory
}