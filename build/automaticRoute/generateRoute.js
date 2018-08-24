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
    files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
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


function render(){
    var filesList = geFileList(nodePath.join(__dirname,"../../src/pages"));
    var result = fs.readFileSync(template, {
        encoding: 'utf-8'
    });
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
            let obj = result;
            obj= obj.replace(pathReg,routeItem)
            obj= obj.replace(nameReg,switchStr)
            obj= obj.replace(componentReg,'pages'+routeItem)  
            newRou.push(obj);
        }
    }

    strs='export default {routes:['+newRou+']}';
    writeFile(nodePath.join(__dirname,"../../src/router/newRouter.js"),strs);
}

module.exports=render