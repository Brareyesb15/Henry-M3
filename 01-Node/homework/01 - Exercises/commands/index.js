const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { request } = require("http");

function pwd(print) {
    print(process.cwd())
}

function date(print) {
    print(Date())
}

function echo(print,args) {
    print(args)

}

function ls(print) {
    fs.readdir(".", function(error,files) {

        if (error) throw new Error (error)
        print (files.join(" "))
    })

}

function cat(print,args) {
    fs.readFile(args, "utf-8", (error,data)=>{
        if (error) throw new Error (error);
        print(data)
    })

}

function head(print,args) {
    fs.readFile(args,'utf-8',(error,data) =>{
        if (error) throw new Error (error);
        const lines = data.split("\n")
        print(lines[0].trim())
    })
    
}

function tail(print,args) {
    fs.readFile(args,"utf-8",(error,data)=>{
        if (error) throw new Error (error);
        const lines = data.split("\n")
        print(lines[lines.length-1].trim())
    })
}

function curl(print,args) {
    utils.request(args,(error,response)=>{
        if (error)  throw new Error (error);
        print (response)
    })
}

module.exports = {pwd,date,echo,ls,cat,head,tail,curl};
