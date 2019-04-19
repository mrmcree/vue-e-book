var Router = require('koa-router')
var categoryController = require('./controller/category')
var categoryInfoController=require('./controller/category-info')
var bookInfoController=require('./controller/book-info')
var bookController=require('./controller/book')
var cheerio = require('cheerio')
let router = new Router()
var async=require('async')
var http = require('./http').http



router.get('/category',categoryController.getCategory)
router.get('/category-info',categoryInfoController.getCategoryInfo)
router.get('/book-info/:id',bookInfoController.getbookInfo)
router.get('/book-chapter/:id',bookInfoController.getChapter)
router.get('/book/:url',bookController.getBook)
router.get('/', function (ctx) {
    ctx.body = 'hello'
})
module.exports = {
    router
}
