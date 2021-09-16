const fs = require('fs')
const path = require ( 'path' )

const keys = {}
var total = 0 
var index = 0

const calculate = (file)=>{
    try {
        const array = fileToArray ( path.resolve ( file ) )
        //Start here
        traverse ( array , file )
        //save total to first file info
        let firstItem = Object.keys(keys)[0]
        keys[firstItem] = total

        //create array of subtotals
        let arr = Object.values ( keys )
        //remove first items since we have the general total
        arr.splice(0,1)

        //sum thru the array
        arraySum(arr)
    
        return keys
   
    } catch ( err ){
        console.log ( file , ' not found!')
    }
}

/* Functions --------------------------------------------------------------------- */

// fileToArray()
// read file lines to array (convert a string to float if line is a number). 
// Since a number can be integer as decimal is converted to float
// @file = file path
function fileToArray(file){
    try {
        return fs.readFileSync(file,'utf8').split("\r\n").map( a=> { return  parseFloat(a) ? parseFloat(a) : a } );
    } catch ( err ){
        return err
    }
}

// traverse()
// iterate over each line of the file and stop if reference to a new file is not found, calculate the total sum
// @array = file content array
// @name = key (file name)
function traverse ( array , fileName ){
    let fileTotal = 0
    let nextFile = ''
    array.forEach ( line => {
        if ( typeof line === 'number' ) {
            total += line
            fileTotal += line
        } else {
            nextFile = line
        }
    })
    keys [ fileName ] = fileTotal
    if ( nextFile ) {
        try {
            let arr = fileToArray ( path.resolve ( nextFile ) )
            traverse ( arr , nextFile )
        } catch (err) {
            console.log ( nextFile , ' not found or not readable!')
            return err
        }
    }
}

// arraySum()
// iterate to calculate sum of array, then remove array first element
// @array => array to sum
function arraySum ( array ){
    
    //check array length and index is less then array length
    if ( array.length > 1 ) {

        //calculate total of the array
        let tot = array.reduce( (acc, val) => acc + val ); 

        index++;

        //save total to aTotals key index
        keys[Object.keys(keys)[index]] = tot

        //remove first array item
        array.splice(0,1)

        //calculate next with the new array
        arraySum( array )

    } else {
        //end of array found
        return
    }
}


module.exports = calculate;