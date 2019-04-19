var axios = require('axios')
var q = require('q')
var baseURL=require('./config').baseURL

exports.http = (url, params) => {
    var def = q.defer()

    let httpDefault = {
        method: 'get',
        url: url,
        baseURL,
        headers: {
            'content-Type': 'text/html; charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
        },
        // params: method === 'GET' || method === 'DELETE' ? params : null,
        // data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        timeout: 10000
    }


    axios(httpDefault)
        // 此处的.then属于axios
        .then((res) => {
            def.resolve(res)
        }).catch((response) => {
            def.reject(response)
        })
    return def.promise;



}