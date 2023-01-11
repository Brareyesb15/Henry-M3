const process = require("process");
const commands = require("./commands/index.js");



const print = (output) => {
  process.stdout.write(output)
  process.stdout.write("\nprompt > ") // n es salto de linea
}
function bash() {
 
  process.stdout.write("prompt > ")
  process.stdin.on("data", (data) => {
    const args = data.toString().trim().split(" ")
    var cmd = args.shift()  
    commands[cmd] ? commands[cmd](print, args.join(" ")) : print (`command not found: ${cmd}`)}


  )}


bash();
module.exports = {
  print,
  bash,
};
