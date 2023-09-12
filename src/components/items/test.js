// //Function Expression - Doesn't get hoisted, Doesn't get defined until runtime
// const usa = () => {
//     console.log('merica')
// }
// //Or
// var canada = function() {
//     console.log('hockey')
// }
// // Function Declaration - Gets hoisted & defined at parsetime
// function india() {
//     console.log('spicy')
// }

// // Function Invocation/Call/Execution
// usa()
// india()

// function marry(...args) {
//     console.log(args)
//     console.log(Array.from(args))
//     console.log(`${args[0]} is now married to ${args[1]}`)
//     return `${args[0]} is now married to ${args[1]}`
// }

// marry('Tim', 'Tina')


// function two() {
//     var isValid;
// }

// function one() {
//     var isValid = true;
//     two()
// }

// var isValid = false;
// one()

// var x = 'x'

// function findName() {
//     var b = 'b';
//     return printName();
// }

// function printName() {
//     var c = 'c';
//     console.log('Andrei Neo');
//     return 'Andrei Neo'
// }

// function sayMyName() {
//     var a = 'a';
//     return findName();
// }

// sayMyName()
// **************************** //
// Function vs Block Scope

// if (5 > 4) {
//     var secret = '1235';
// }

// secret;


// const obj = {
//     name: 'Bill',
//     sing() {
//         return 'lala ' + this.name
//     },
//     singAgain() {
//         return this.sing() + '!'
//     },
// }

// obj.sing() // => 'lala Bill'

// function importantPerson() {
//     console.log(this.name)
// }

// const name = 'Sunny';
// const obj1 = {
//     name: 'Peggy',
//     importantPerson: importantPerson
// }
// const obj2 = {
//     name: 'Roger',
//     importantPerson: importantPerson
// }

// importantPerson(); // => 'Sunny'
// obj1.importantPerson(); // => 'Peggy'
// obj2.importantPerson(); // => 'Roger'

const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this);
        var anotherFunc = function() {
            console.log('b', this)
        }
        anotherFunc()
    }
}