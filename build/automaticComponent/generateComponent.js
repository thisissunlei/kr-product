const fs = require('fs')
const nodePath = require('path')
const template = nodePath.resolve(__dirname+'/auto.component.js')
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


function render(paths){
    var filesList = geFileList(nodePath.join(__dirname,"../../src/components"));
    var result = fs.readFileSync(template, {
        encoding: 'utf-8'
    });
    // return ;
    var newArra = [];
    var newRou = [];
    var pathReg = new RegExp('\\$\\{path\\}', 'ig');
    for (var i = 0; i < filesList.length; i++) {
        if(filesList[i].split('/components')[1]){
            let results = filesList[i].split('/components')[1];
            let firstDir = results.split('/')[1];
            // 排除文件 
            if(firstDir.indexOf('.') == -1){
                newArra.push(firstDir)
            }
        }
    }
    var unicArray = [...new Set(newArra)]
    unicArray.map((v,i)=>{
        let obj = result
        obj= obj.replace(pathReg,v)
        newRou.push(obj)
    })

    var str =  newRou.join();
  
    var str_result = str.replace(/,/g,'');

    strs= str_result + '\n'+'module.exports ={' + unicArray +'}';
    writeFile(nodePath.join(__dirname,"../../src/components/index.js"),strs);
}

module.exports=render