const { format, isValid, parse } = require("date-fns");

let value = "10.05.2008"


let b = parse(value, 'dd.MM.yyyy', new Date())
console.log(b.getMonth());