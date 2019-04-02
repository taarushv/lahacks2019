const wiki = require('wikijs').default;
function chunkString(str, len) {
    var _size = Math.ceil(str.length/len),
        _ret  = new Array(_size),
        _offset
    ;
    for (var _i=0; _i<_size; _i++) {
      _offset = _i * len;
      _ret[_i] = str.substring(_offset, _offset + len);
    }
    return _ret;
}
const getWikiInfo = async (name) => {
    console.time('ok')
    const page = await wiki().page(name)
    const summary = chunkString(await page.summary(),1550)
    const fullInfo = chunkString(JSON.stringify((await page.fullInfo()).general), 1550)
    console.timeEnd('ok')
    return [summary, fullInfo]
}

getWikiInfo('gandhi')