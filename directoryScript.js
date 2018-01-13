const fs = require('fs');
const path = require('path');
const dir = './modules';

let dirArr = [];
// check the modules directory to find any more folders (aka apps) - if true, push to dirArr
const getDirectories = srcPath => {
  fs.readdirSync(srcPath).filter(file => {
    if(fs.statSync(path.join(srcPath, file)).isDirectory() === true){
      dirArr.push(file)
    }
  })
}
getDirectories(dir)
console.log(dirArr)

// print out files
/*
const listDirectories = fs.readdir(dir, (err,files) => {
   for(let i = 0; i < files.length; i++){
     console.log(files[i]);
   }
 })
*/
  
// create import strings that will be needed
var strArrStaticImport = [
  "import React, { Component } from 'react'\n",
  "import { Switch, Route, Link } from 'react-router-dom'\n"
]

var strArrStaticOpen = [
  "\n",
  "class Router extends Component {\n",
  "  render() {\n",
  "    return(\n",
  "      <Switch>\n",
  "        <Route exact path='/' component={StarterApp}/>\n"
]

  
let strArrDynamicImport = [];
let strArrDynamicRoute = [];
for(let i = 0; i < dirArr.length; i++){
  let curr = dirArr[i]
  let currImportStr = `import ${curr} from './modules/${curr}'\n`
  strArrDynamicImport.push(currImportStr)
  let currRouteStr = `        <Route path='/${curr}' component={${curr}}/>\n`
  strArrDynamicRoute.push(currRouteStr)
}

var strArrClose = [
  "      </Switch>\n",
  "    )\n",
  "  }\n",
  "}\n",
  "export default Router\n"
]

// create router file
let fileName = 'router.jsx'
let routerFile = path.join(__dirname, fileName);

console.log('routerFile: ', routerFile);

// import the first known needed modules;
for(let i = 0; i < strArrStaticImport.length; i++){
  fs.appendFileSync(fileName, strArrStaticImport[i], function(err){
    if(err) throw err;
  });
}
// import the developer modules
for(let i = 0; i < strArrDynamicImport.length; i++){
  fs.appendFileSync(fileName, strArrDynamicImport[i], function(err){
    if(err) throw err;
  });
}


// being the react router switch statement 
for(let i = 0; i < strArrStaticOpen.length; i++){
  fs.appendFileSync(fileName, strArrStaticOpen[i], function(err){
    if(err) throw err;
  });
}
// add the developer modules to the switch statement  
console.log(strArrDynamicRoute);
for(let i = 0; i < strArrDynamicRoute.length; i++){
  fs.appendFileSync(fileName, strArrDynamicRoute[i], function(err){
    if(err) throw err;
  });
}

for(let i = 0; i < strArrClose.length; i++){
  fs.appendFileSync(fileName, strArrClose[i], function(err){
    if(err) throw err;
  });}


fs.readFile(routerFile, 'utf8', function(err,data){
  if(err) throw err;
  console.log('OK ' + routerFile);
  console.log(data)
});