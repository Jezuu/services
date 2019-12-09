// module.exports.dbList = function(db) {

//     var Table = require('cli-table');
//     var table = new Table({head: ["Host", "User", "Password", "Database"]});

//     var keys = Object.keys(db);

//     for(var i = 0, length = keys.length; i < length; i++) {

//         if(db[keys[i]].password === '')
//             db[keys[i]].password = 'null';

//         table.push([

//             db[keys[i]].host,
//             db[keys[i]].user, 
//             db[keys[i]].password,  
//             db[keys[i]].database
//         ]);
//     }
    
//     console.log("\r\n");
//     console.log(table.toString());
//     console.log("\r\n");

//     return;
// };


// module.exports.routeList = function(routes) {

//     var Table = require('cli-table');
//     var table = new Table({ head: ["Method", "Path"] });

//     var keys = Object.keys(routes);

//     for(var i = 0, e = 0, length = keys.length; i < length; i++) {

//         if(routes[keys[i]].name === 'bound dispatch')
//             table.push([routes[keys[i]].route.stack[0].method, routes[keys[i]].route.path]);
//     }

//     console.log("\r\n");
//     console.log(table.toString());
//     console.log("\r\n");

//     return;
// };