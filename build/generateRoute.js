const fs = require('fs')
const nodePath = require('path')
const template = nodePath.resolve(__dirname+'/auto.router.js')
// co
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//遍历读取文件
function readFile(path, filesList) {
    // path = nodePath.join(__dirname, path)
    // console.log(path,"pppp")
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            //创建一个对象保存信息
            /*var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径*/
            var paths = path + '/' + file;
            filesList.push(paths);
        }
    }
}

//写入文件utf-8格式
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, complete);
    function complete() {
        console.log("文件生成成功");
    }
}

var filesList = geFileList("../src/pages");
console.log(template, "pppppp")
var result = fs.readFileSync(template, {
    encoding: 'utf-8'
});
console.log(result,"pp-----pp")
// return ;
var allObj = {};
var newRou = [];
var portStr = '';
var pathReg = new RegExp('\\$\\{path\\}', 'ig');
var nameReg = new RegExp('\\$\\{name\\}', 'ig');
var componentReg = new RegExp('\\$\\{component\\}', 'ig');
for (var i = 0; i < filesList.length; i++) {
    if (filesList[i].indexOf('index.vue') != -1) {
        var item = filesList[i].split('pages')[1];
        var switchItem = item.split('/index.vue')[0].split('/');
        var switchStr = '';

        switchItem.map((item, index) => {
            if (item) {
                switchStr = switchStr ? switchStr + '-' + item : item;
            }
        })
        var routeItem = item.split('/index.vue')[0];
        // var routeObj = { path: routeItem, name: routeItem };
        // var routeItem = item.split('/index.vue')[0];
        let obj = result;
        obj= obj.replace(pathReg,routeItem)
        obj= obj.replace(nameReg,switchStr)
        obj= obj.replace(componentReg,routeItem)
        
        newRou.push(obj);
    }
}
// console.log(strRou);
// var strRou=JSON.stringify(newRou);
strs='module.exports={routes:['+newRou+']}';
writeFile("../src/router/newRouter.js",strs);