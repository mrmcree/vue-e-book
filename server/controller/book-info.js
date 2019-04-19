var http = require("../http").http;
var cheerio = require("cheerio");
async function getbookInfo(ctx) {
  let { id } = ctx.params;
  let result = await http(`book/${id}`).then(res => {
    var $ = cheerio.load(res.data);
    var bookInfo = $(".book-info");
    var author = bookInfo.find(".info .sup a").text();
    var textSplit = bookInfo
      .find(".info p")
      .eq(1)
      .text()
      .split("|");
    var codeNum = textSplit[textSplit.length - 1];
    var title = bookInfo.find(".cover").attr("alt");
    var cover = bookInfo.find(".cover").attr("src");
    var longIntro = $(".book-section p").text();
    return {
      author,
      codeNum,
      title,
      longIntro,
      cover,
      id
    };
  });
  // console.log(result)
  ctx.body = result;
}
async function getChapter(ctx) {
  let { id } = ctx.params;
  let result = await http(`book/${id}`).then(res => {
    var $ = cheerio.load(res.data);
    var chapters = $(".chapter-list li");
    var data = [];
    chapters.each((index, value) => {
      var chapter = chapters
        .eq(index)
        .children("a")
        .text();
      var link = chapters
        .eq(index)
        .children("a")
        .attr("href");
      data.push({
        chapter,
        link
      });
    });
    return data;
  });
  ctx.body = result;
}
module.exports = {
  getbookInfo,
  getChapter
};
