// Function that sums the numbers in a file and outputs details of the results. 
// - The function will receive as input the path to a single file. 
// - Each line of the file will contain either a number or a relative path to another file. 
// - For each file processed, output the file path and the sum of all of the numbers contained 
// both directly in the file and in any of the sub files listed in the file (and their sub files, etc).

const calculate = require( './calculate.js' )

// call main function calculate ( file_name )
let result = calculate ( 'A.txt' )

//Output result 
Object.keys(result).forEach ( f => {
    console.log  (  f , '-' , result[f] )
})