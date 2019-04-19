function parseURL(name,url) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};
module.exports={
    parseURL
}