const { format, isValid, parse } = require("date-fns");

let value = "Dec 25, 2008"

console.log(new Date(value).getTime())