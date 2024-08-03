const math = require("./math")
const os = require("os")

console.log("Project Started!!!!");

console.log("Cpu's = " + os.cpus().length);
console.log("Sum = " + math.add(10, 20));