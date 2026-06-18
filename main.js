// we can also create a new http server with the help of nodejs module name http
// const http = require("http");
// const cb = (req, res) => {
//   res.end("Hello sended by the server");
// };
// const server = http.createServer(cb);
// server.listen(500);

// we can also spawn a new process using nodejs by the help of child_process module

// const { exec } = require("child_process");
// exec("start chrome");

// what is process ?
// process is a running of any application in a system by the allocation memory and some other resource which provided by os and main thing is cpu time
// process is not always run by any other process means it was run after a process starts another process some time a process should not have any parent process or not started by any process it run automatically . The process which was spawn by any other process then  process have a parent process .
// a process can start so many process
// to identify every process by the os . os provide a pid to every process . which also known as process id (pid)
// process have always a main thread to run it can create so many thread depend on that and it can have multiple threads
// state of process =>initialized ,waiting ,running,sleeping ,terminated
// os not runs a process to a core of cpu for long time it will switch the process and run different process to do every calculation on different process to avoid blocking other process means it switch and come back after other process because it's important run other process also if it will not happened then system can be crashed . so that switching is known as context switching
// we can also access that process id (pid) and parent process id (ppid) to identify the id of the current process and parent process from the node js

// what is threads?
// in processor there is a physical core and on the top of physical cores one logical core (virtual thread) which allows better utilization of cpu which perform the task more smooth this is know as logical cores the total logical cores is equals to total threads+physical cores
// threads does a specific work for the process to allow multiple work execution if one thread is present then only one works can be done but if there should be multithread system then it can do so many task at same time or if there is so many logical cores in cpu then it will work more efficiently
// threads takes cpu time and also use memory (shared memory)
// it has tid (thread id) to identify the threads by the process
//  the difference of process and thread is the process take more memory then the thread because process allocate memory but thread not it uses the process memory only and other is process have there won memory so if there should have any thread which does can do changes in memory the hole process and there thread will crashed if a single process create other process and there should any problem in any other process then there should not be a problem to the main process means specific process will crashed
// we can also create a threads using nodejs
//  javascript is single threaded but nodejs uses worker threads and libuv internally for multithreading
// there is way to make thread by the help of workers
// const { Worker }=require("worker_threads");
// new Worker("path");

// what is env?
// env (environment variable) this is variable which have key and value pair in it
// which stores data in string formate both key and value . the work of env is to store some important information like path,api key, important password , etc..
// there is area where env values where used =>processes,user specific,os
// env value inherited automatically if the process is started from any parent process that has parent process it paste there env value to child env.
// we can split  values in a single key with semicolon in windows and colon in linux os and mac
// to view env using bash terminal then we use env or printenv cmd
// we can set env using bash terminal using setx cmd => setx key "value" => this cmd help to set the user specific env not to the system
// we can delete env of terminal process using unset cmd=> unset KEY
// to create a new env variable in bash terminal we use =>export key=value;
// to stop the env value to pass to the child process we use this cmd => env -u KEYNAME nodejs
// to send the env value specifically to the new child process not to any parent then we use this cmd => key2=value2 key1=value1 nodejs
// or there is any other way to send the env to the process like nodejs we use .env or any file which is like normal files (because env files where a normal txt file nothing extra)
// to check the env form nodejs we use =>process.env;

// what is wsl?
// wsl (windows subsystem for linux) this is a way of installing linux on window using wsl (like a virtual machine).
// it install linux distribution(ubuntu) on windows with lightweight linux environment which is not a full virtual machine
// there is a symbolicLink in home directory which is nothing just a linking of other folder from that folder like a link.
// symbolicLink where denoted as =>l
// directory is denoted as =>d
// files where denoted as =>-
// to run cmds in bash terminal here is a two way
// 1. write the fileName with relative path or use bash cmd with fileName with relative path => bash fileNamePathName.
// 2. write source cmd and file path to run the file .source fileNamePathName
// the difference on both is when every we write bash cmd with filePath or fileNamePathName directly if execute permission is given then bash terminal create a new process which evaluate it and show the output on that not in main process it shows
// but when we write "source" keyword the terminal would not create any new thread or process for that execution .It runs on same  process and execute it there only

//file permissions
// in windows every files has execution permission  like this files (html,css,sh,etc...) they  allowed to execute when the file path is given.By just writing filePath  that file that executed in terminal like a bash file only in bash terminal  or according to the terminal it executed.
// the file will executed when every absolute file path is written or the files is on same folder then we write ./file.extension
// in linux all files has not the permission to execute . We have to set the permission to execute to run the files as a executable file.
// there r two type of executable files
// 1. script files => bash file,js,py,cmd,bat,etc...
// 2. binary files =>exe,.deb,.rpm

// file/folder permission in linux
// there is only 3 permission present in file and folder in linux
// read (r)(4)
// write (w)(2)
// execute (x)(1)
// in windows os file permissions like r,w,x all this permission are allowed as default
// in linux  file permission where only r,w not execute permission where allowed as default
// there is 3 types of users which is split by linux os
// current user(u) => the user where the current session is running.
// group users(g) => the users which come in same group where the current user present.
// other users(o) => the users which would not present in same  group where current user is present .
// file (-) directory (d) symbolicLink(l);
// changing the permission  of a file in linux we has to use chmod command .
// -(negative) is to remove the permission and +(positive) is to add the permission
// chmod -r filePath/folderPath
// chmod +w filePath/folderPath => only this  permission(write) where given to current users it will not provided to other users and group users because  write permission crucial .
// chmod g-r filePath/folderPath => only group user permission(read) where removed from that files and folder
// chmod 611 filePath/folderPath =>we can also set the permission using numbers (4)=>read (1)=>execute (2)=>write  . wanted to use all cmd then we sum it and uses that .
//       |||
//       |||
//        v
// first  currentUser =>6 =>r(4)+w(2)
// second group user =>1 =>w(2)
// third other users =>1 =>w(2)

// cmd priority
// when every we type any cmd in bash terminal cmd will not run directly it check  priority level
// 1. alias => first bash check that is the cmd is made up of alias if yes then it run if any cmd is override with alias that  cmd will not run.
// 2. function => in bash we can create functions which is second priority for bash . any thing which is  a function then that thing will run not other cmd will run.
// 3. built-in => the cmd which is built-in in the bash terminal that cmd will run .
// 4. hash => like any executable file which is present in env on a path variable . if the executable file is run that is stored by hash on bash which stores the path to make things easily to find that file without going to the path variable just by going to hash structure . There is so many paths of directory present in path variable and to find the actual file the bash terminal check every file in PATH variable in (env). if it found then it stores it in hash for next time for find the file easily .Hash also stores how many hits where performed on that path which is stored in hash.there is cmd to view hash to view that use "hash" cmd.
// 5. executable => any file which have permission of executing  or it is a executable file  (script or binary) then that file also become  a cmd which a terminal can run and execute it .
// we can check the cmd is from where by using "type cmdName" cmd
// ever  think that if we installed python or nodejs in our system then we would type the name of the executable (binary) file and then that executable starts and that file is not present in your current directory it stored some where else but we can execute it . We know that if any executable file is not present in current directory that file will not accessed and would not run it shows error then how that's works . This all works because of PATH variable present in env (environment variable) which provides the path for the directory and path variable present in specific users and system level path for the application to work where the file is present this is used by so many application also by bash terminal  . if we added directory path on path variable then that file will be accessed all over users or system where u have written according to that .

// common js
// common js in nodejs this is a default module system present in javascript that help to import and export the modules from one module to another .
// to import the variable or function or data type from any  module that exports something then we use require function that help return the value which was passed in module.exports .
// the require function  returns the value which was exported from that module file that exported value present in module.exports that value is returned by this function
// to export any thing from a module we use module.exports object or exports variable =>(this points to   module.exports object) when every we write there that is return  by the require function .
// when every we use common js module system to exports and imports the modules from one file to another it wrap the hole code to a module wrapper function . That module wrapper function which is iife function that's why it shows local scope every time if we check the scope.
//when every we change the reference of the module.exports or exports then both property and variable get unlinked so if we try to update the value with exports variable then it will not exported but if we try to update with module.exports then it will be
//common js module system is automatically enabled but if the package.json is present and on that file module type is given then to use the commonjs module system then u have to write this  to enable common js module system on that file there have to change the extension as a .cjs of a javascript file

//ES6 module system
// this module comes after common js module system .This system is comes in ES6+ update
// in this system we can use export keyword and import keyword to import the file from one module to another .
// to enable the es6 module system to use import and export we have to create a package.json and write the json a key name with the value => "type":"module" to enable it because in default it's common js and one more way to use es6 module system  if not wanted to use package.json file we can just write the file extension of js file as a .mjs.
// es6 module system only takes .js or .mjs modules .Other then it would not takes so if full path is not given then it will shows error.
// in module system it create a different scope which know as module scope

// import.meta
// to get access to the directory name and file name in es6 module system . we have to use import.meta .

// type of modules in nodejs
// there is totally 3 module
// 1. core/native modules r those module which present in nodejs natively already like fs,http,net,worker_threads,child_process.
// 2. (third party or also know as npm package) module this modules are third party module this module help to write code simple in nodejs => axios ,react,express etc....
// 3. those modules which created by user those module are know as user module .example =>math.js,useDefined.js .
// this all module type can be accessed by the help of es6 module or common js module system.

// creating our won npm package
// 1. create package.json file
// 2. create .cjs and .mjs file for supporting=> common js   and es6 module system
// 3. now in package.json
// 1. exports:{
// import:".mjs",
// require:".cjs",
// }
// for those who will use import keyword those get .mjs file or require function then get .cjs file
// if a single file is present then use "main":"path" .
// 2. version:1.0.0 => version of package.
// 3. keywords=> seo of package in npm website.
// 4. author:{}=> owner and contributor name .
// 5. name:""=> package name.
// 6. description=""=> package description.
// 7. dependence:{}=> current package depends on other packages .
// 8. devDependencies:{}=> same as dependence but only be useable in development after that it will be removed from project.
// 9. script:{}=> for running the package or any thing by typing "npm run scriptName" which written in key value in script object . Some keys where special which runs without "npm run " it directly run by just "npm scriptName"
// those are => start,restart,stop,test etc...

// just by doing this  your package is ready to use and can deploy to the npm with readme.md file

// different way to use version of the package
// 1. version:"^1.0.0", => this ^ carte symbol only update the minor and patch update . package major update will be not updated.If the major version is starting with 0 like this (0.2.4) then  only patch update will be automatically update or installed.Minor update will be not ignored.
// 2. version:"~2.3.4", =>~ tilde symbol only update the patch update of package when ever we install or wanted to update the package
// 3. version:">=2.5.3", => greater then equal to symbol use update/install the package up to 2.5.3 or more if new version available.
// 4. version:'>2.4.5'=>greater then symbol any version more then specific version given to that according to that it will updated to latest version.
// 5. version:"<4.34.4"=> less then symbol used to update/install the package less given version .
// 6. version :"<=4.3.3"=> less then equal to  symbol used  to update/install the package up to the specific version  .
// 7. version:"3.5.3"=> static value download that specific  version only no other version will be downloaded/updated.
// 8. version:"*"=> this universal star (*) symbol update the package to latest version always or install the package to latest version

// shebang #!
// this #! two symbol known as shebang which help to run the script file according to it's interpreter  by  writing in top of the file #! with filepath without space that file  will run always with that interpreter in terminal which is passed in the shebang  .

// example to write there is two way to write
// 1. if that interpreter is present in global then it will be accessed by this cmd
// #!/usr/bin/env node
// it will find the node file all over the path present in path variable present in (env) .After find it  will execute that executable file with that interpreter.
// 2. if it is not present in path variable means globally then write full path of the interpreter
// like this  => #!C:/Program\ File/node/node.exe

// fs  promise module
// 1. to readAny file
// =>we use readFile function to read the content of any file . like png,js,txt,any extension
//=>readFile("path","typeof encoding of content if not given the buffer will be sended");
// 2. to write file
// wanted to write inside file then we use writeFile. If that file have something written then it will be overwrite by this.
//writeFile("path","content","typeof encoding of content");
//  3.to append content in same file
//  if the file have some thing written already but wanted to add  some more content on that then we use
// appendFile("path","content","typeof encoding of content")
// 4. creating file
// we can create file with the help of appendFile or writeFile . If the file is not present just write the file path what type of file you want to make .If wanted to write something then write the content if not then use empty string.
// appendFile("file.txt","","encoding");
// writeFile("file.txt","","encoding");
// creating folder
// we can create a new folder
// mkdir("fileName")
// removing file/folder
// we can remove File/folder or folder having sub folder or file
// rm("pathOfFile");//remove file
// rm("pathOfFolder",{recursive:true});//remove folder having content inside or not
// rename folder/file
// we can rename folder/file
// rename("path/cnt.txt","path/newname.txt")//rename of file
// rename("path/folder","path/folding"); rename of folder
// moving of folder/file
// we can move file/folder with the help of same function rename by just typing new path and the same name or different name it will be moved
// rename("C:/User/find3/OneDrive/Desktop/nodejs.jpeg","./js.jpeg"); moving of file
// rename("C:/User/find3/OneDrive/Desktop/Backend","./Backend_With_Node");moving of folder
// copy of file
// using copyFile function  we can copy the file with same name or different name .
// copyFile("./path.txt","../otherPath.txt");
// copy of folder
// using cp function we can copy the empty folder or folder which have some content
// cp("C:/window/emptyFolder","C:/copyEmptyFolder")//empty folder copying
// cp("../router",'./routs',{recursive:true})// copy all the subfolder or file present in the folder
// read  directory file/directory
// by the help of readdir function we can read file and folder of the directory
// readdir("path");//array of files and directory
// stat this help to find the path is folder or file in the directory
// stat("path")(methods isDirectory or isFile)

// fs module
// to watch the file is changed or renamed we use watch function this is simple on normal fs . Hard in promise fs
// fs.watch("pathOfFile",(typeOfUpdate,filePath)=>{});when ever any changes occurs then callback function will run.
// Data Representation Systems

// There are two systems used to represent storage sizes:

// 1. SI (International System of Units)
//    - Used by hardware manufacturers (SSD, HDD, pen drive, mobile companies).
//    - Uses powers of 10 (10^3 = 1000).
//    - Example:
//      1 KB = 1000 Bytes
//      1 MB = 1000 KB
//      1 GB = 1000 MB
//      1 TB = 1000 GB

// 2. IEC (International Electrotechnical Commission)
//    - Used by operating systems and software to display storage sizes.
//    - Uses powers of 2 (2^10 = 1024).
//    - Example:
//      1 KiB = 1024 Bytes
//      1 MiB = 1024 KiB
//      1 GiB = 1024 MiB
//      1 TiB = 1024 GiB

// Real-life example:
// A pen drive sold as "32 GB" (manufacturer's SI value)
// actually contains 32 × 1000^3 = 32,000,000,000 bytes.

// When your operating system calculates the same bytes using IEC,
// it shows:
// 32,000,000,000 ÷ 1024^3 ≈ 29.8 GiB.

// This is why a 32 GB pen drive appears as about 29.8 GiB in Windows/Linux/macOS.
// No storage is missing; only the measurement system is different.

// Difference example:
// 32 GB  = 32 × 1000^3  = 32,000,000,000 Bytes
// 32 GiB = 32 × 1024^3  = 34,359,738,368 Bytes

// In JS we show HEXDEC,BINARY,OCTAL systems in different way.
// HEXDEC=> 0xfa
// BINARY=> 0b101
// OCTAL=> 0o712
// this will automatically  converted into decimal system

// There is way to view the hex and binary of a character means there unicode U+ in the form of hex and binary ,using xxd (hex dump) exe file used in bash terminal .
// there is xxd named executor which takes files path and convert the text into hex formate
// example:- xxd src/test.js
// now this provide a pair of hex digit if wanted single single then use this -g flag with n number for splitting or adding .
// xxd -g 1 src/test.js
// for viewing the binary numbers not the hex we use `-b` flag for that
// xxd -b src/test.js
