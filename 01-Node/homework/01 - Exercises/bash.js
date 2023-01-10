const process = require("process"); // nativo de node
const commands = require("./commands/index.js");

function print(output){
  process.stdout.write(output)
  process.stdout.write("\nprompt > ")
}

function bash() {
  process.stdout.write("prompt > ")
  process.stdin.on("data", (data)=>{
    const args = data.toString().trim().split(" ")
    var cmd = args.shift() // cmd -> 'cd'    args -> [ 'commands', 'otra' ] <- join " "  'commands otra'
    // console.log("--->", args)
    // if(commands[cmd]){
    if(commands.hasOwnProperty(cmd)){
      commands[cmd](print, args.join(" ")) // commands.pwd(print, 'commands otra' )
    } else {
      print(`command not found: ${cmd}`)
    }
    // print(args)
  })

}

bash();
module.exports = {
  print,
  bash,
};