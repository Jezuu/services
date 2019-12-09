/*
|--------------------------------------------------------------------------
| DB Manager
|--------------------------------------------------------------------------
*/

const _mysql = require('mysql');
const util = require('util');

let _conn = null;

_bindings = {

    select: '',
    from: '',
    where: '',
    orWhere: '',
    andWhere: '',
}

_operators = [

    '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
    'like', 'like binary', 'not like', 'ilike',
    '&', '|', '^', '<<', '>>',
    'rlike', 'regexp', 'not regexp',
    '~', '~*', '!~', '!~*', 'similar to',
    'not similar to', 'not ilike', '~~*', '!~~*',
]

class DB {

    constructor() {

        this.Name = 'DB Manager';
        this.Version = '1.0';
        this.State = this._checkState();
        this.Methods = {

            connect: this.connect,
            table: this.table,
            select: this.select,
            where: this.where,
            get: this.get,
            exist: this.exist,
            toSql: this.toSql,
            escape: this.escape,
        }
    }

    connect(database) {

        _conn = _mysql.createConnection(database.connections.mysql);

        if(!_conn._connectCalled) {

            _conn.connect((err) => {
                if (!err)
                	console.debug("Conectado!");
                    //console.debug("\x1b[31m", "Mysql Error: ", "\x1b[0m", err.code+", "+err.sqlMessage) & process.exit();
                //else
            });
        }

        return _conn;
    }

    table(table) {

        _bindings.select = '';
        _bindings.from = '';
        _bindings.where = '';
        _bindings.andWhere = '';
        _bindings.orWhere = '';
        _bindings.from = "FROM " + table;

        return this;
    }
    
    select() {

        let colums = Array.prototype.slice.call(arguments).join(", ");

        if(colums)
            _bindings.select = "SELECT " + colums + " ";
        else
            _bindings.select = '';

        return this;
    }
    
    where(colum, operator, value) {

        if(arguments.length < 3)
            value = operator, operator = null;

        _bindings.where = " WHERE " + colum + " " + ((_operators.includes(operator)) ? operator : '=') + " " + this.escape(value);

        return this;
    }

    orWhere(colum, operator, value) {

        if(arguments.length < 3)
            value = operator, operator = null;

        _bindings.orWhere = " OR " + colum + " " + ((_operators.includes(operator)) ? operator : '=') + " " + this.escape(value);

        return this;
    }

    andWhere(colum, operator, value) {

        if(arguments.length < 3)
            value = operator, operator = null;

        _bindings.orWhere = " AND " + colum + " " + ((_operators.includes(operator)) ? operator : '=') + " " + this.escape(value);

        return this;
    }

    _prepare() {

        return ((_bindings.select) ? _bindings.select : "SELECT * ") + _bindings.from + _bindings.where + _bindings.andWhere + _bindings.orWhere;
    }

    async get() {

        let fn = util.promisify(_conn.query).bind(_conn);

        return await fn(this._prepare());
    }
    
    async exist() {

        let fn = util.promisify(_conn.query).bind(_conn);
        let result = await fn("SELECT * " + _bindings.from + _bindings.where);

        if(result.length)
            return true;
        else
            return false;
    }

    toSql() {

        return this._prepare();
    }

    escape(string) {

        return _mysql.escape(string);
    }

    _checkState() {
        
        if(_conn && _conn._connectCalled)
            return 'Connected';
        else
            return 'Disconnected';
    }
}
  
module.exports = new DB();

// var con = null;
// var bindings = {

//     select: '',
//     table: '',
//     where: '',
// };

// // _bindings = [

// //     'select'   = [],
// //     'from'     = [],
// //     'join'     = [],
// //     'oderBy'   = [],
// //     'limit'    = [],
// //     'where'    = [],
// //     'orWhere'  = [],
// //     'andWhere' = [],
// //     'having'   = [],
// //     'order'    = [],
// //     'max'      = [],
// //     'min'      = [],
// //     'count'    = [],
// //     'union'    = [],
// //     'insert'   = [],
// //     'update'   = [],
// // ];

// _operators = [

//     '=', '<', '>', '<=', '>=', '<>', '!=', '<=>',
//     'like', 'like binary', 'not like', 'ilike',
//     '&', '|', '^', '<<', '>>',
//     'rlike', 'regexp', 'not regexp',
//     '~', '~*', '!~', '!~*', 'similar to',
//     'not similar to', 'not ilike', '~~*', '!~~*',
// ];

// module.exports.mysql = mysql;

// module.exports.connect = () => {

//     con = mysql.createConnection(database.db.connections.mysql);

//     if(!con._connectCalled)
//     {
//         con.connect((err) => {

//             if (err)
//                 console.debug("\x1b[31m", "Mysql Error: ", "\x1b[0m", err.code+", "+err.sqlMessage);
//             else
//                 console.debug("Conectado!");
//         });
//     }

//     return con;
// };

// module.exports.table = (table) => {
//     bindings.table = "FROM " + table + " ";
//     return this;
// };

// module.exports.select = (key) => {
//     bindings.select = "SELECT " + key + " ";
//     return this;
// };

// module.exports.where = (key, operator, value) => {
//     if(value === undefined)
//         value = operator;

//     bindings.where = "WHERE " + key + " " + ((_operators.includes(operator)) ? operator : '=') + " " + "'"+value+"'";
//     return this;
// };

// module.exports.get = async () => {
//     var fn = util.promisify(con.query).bind(con);
//     return await fn(bindings.select + bindings.table + bindings.where);
// };

// module.exports.exist = async () => {
//     var fn = util.promisify(con.query).bind(con);
//     var result = await fn("SELECT * " + bindings.table + bindings.where);

//     if(result.length)
//         return true;
//     else
//         return false;
// };

// module.exports.toSql = () => {
//     return bindings.select + bindings.table + bindings.where;
// };