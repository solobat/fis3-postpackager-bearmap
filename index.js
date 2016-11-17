
module.exports = function (ret, conf, settings, opt) {
  // ret.src 所有的源码，结构是 {'<subpath>': <File 对象>}
  // ret.ids 所有源码列表，结构是 {'<id>': <File 对象>}
  // ret.map 如果是 spriter、postpackager 这时候已经能得到打包结果了，可以修改静态资源列表或者其他
  // settings 调用插件时传入的配置
  var _ = fis.util;
  var path = require('path')
  var root = fis.project.getProjectPath();
  var ns = fis.get('namespace');
   var mapContent = ret.map;
  //根据配置，如果是pubvm时，移除/page/下面所有的配置
  if(settings && settings['pubvm']){
    var mapContent =_.cloneDeep(mapContent);
    var res = mapContent['res'];
    for(var k in res){
      var propObj = res[k];
      if(propObj['extras'] && propObj['extras']['isPage']){
        //如果不是页面类型，移除
        delete res[k];
      }
    }
  }
  
  var mapFile = ns ? (ns + '-map.json') : 'map.json';
  var map = fis.file.wrap(path.join(root, mapFile));
  map.setContent(JSON.stringify(mapContent, null, map.optimizer ? null : 4));
  ret.pkg[map.subpath] = map;

}
