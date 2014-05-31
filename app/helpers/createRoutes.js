var router = require('express').Router();
var fs = require('fs');
var path = __dirname + '/../controllers';


var struct = getResultStruct(path);
createRoutes(struct);
console.log(router)


module.exports = router;


function createRoutes(struct) {
  for (var apiName in struct) {
    for (var ctrlName in struct[apiName]) {
      for (var ctrlMethodName in struct[apiName][ctrlName]) {
        var method, url;
        switch(ctrlMethodName) {
        case 'list':
          method = 'get';
          url = '/' + apiName + '/' + ctrlName + 's';
          break;
        case 'create':
          method = 'post';
          url = '/' + apiName + '/' + ctrlName
          break;
        case 'show':
          method = 'get';
          url = '/' + apiName + '/' + ctrlName + '/:id';
          break;
        case 'update':
          method = 'put';
          url = '/' + apiName + '/' + ctrlName + '/id';
          break;
        case 'delete':
          method = 'delete';
          url = '/' + apiName + '/' + ctrlName + '/id';
          break;
        default:
          continue;
        }
        router[method](url, struct[apiName][ctrlName][ctrlMethodName]);
      }
    }
  }
}





/* Возвращает объект формата:
 * { 'apiName': { 'ctrlName': { 'restFuncName': Func } } }  */
function getResultStruct(path) {
  var struct = {};

  var apis = getApiVersions(path);

  for (var i = 0; i < apis.length; i++) {
    var api = apis[i];
    struct[api] = {};

    var controllers = getControllers(path + '/' + api);
    for (var name in controllers) {
      struct[api][name] = controllers[name];
    }
  }

  return struct;
}



// Возвращает список версий API
function getApiVersions(path) {
  var arr = fs.readdirSync(path),
      results = [];

  for (pos in arr) {
    var ele = arr[pos];
    if ( fs.statSync(path + '/' + ele).isDirectory() ) {
      results.push(ele);
    }
  }

  return results;
}



/* Возвращает контроллеры по определенному пути.
 * Формат возвращаемого объекта:
 * { 'ctrlName': ctrlObj } */
function getControllers(path) {
  var controllers = {};

  var arr = fs.readdirSync(path);
  for (pos in arr) {
    var ele = arr[pos];
    if ( !fs.statSync(path + '/' + ele).isFile() ) {
      continue;
    }

    var endPos = ele.lastIndexOf('Ctrl.js');
    if (endPos == -1) {
      return;
    }

    var ctrlName = ele.slice(0, endPos).toLowerCase();
    controllers[ctrlName] = require(path + '/' + ele);
  }

  return controllers;
}
