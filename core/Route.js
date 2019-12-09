/*
|--------------------------------------------------------------------------
| Route
|--------------------------------------------------------------------------
*/

const express = require('express');
const _App = express();

let _container = null;

class Router {

    constructor() {

        this.Name = 'Route';
        this.Version = '1.0';
        this.Methods = {

            Init: this.Init,
            listen: this.listen,
            get: this.get,
            use: this.use,
            useError: this.useError,
            set: this.set,
        };
    }

    Init(container) {

        _container = container;
    }

    listen(port) {

        _App.listen(port, () => {

            console.debug("\x1b[32m", "\r\nON\r\n", "\x1b[0m");
        });
    }

    get(route, middleware, controller) {

        if(arguments.length < 3)
            controller = middleware, middleware = [];

        _App.get(route, this._getMiddlewares(middleware), async (req, res, next) => {

            if(typeof controller === 'string' )
                this._getController(controller)(req, res);

            if(typeof controller === 'function')
                controller(req, res);
        });
    }

    use(route, callback) {

        if(arguments.length < 2)
            callback = route, route = '';

        _App.use(route, (req, res, next) => {

            callback(req, res, next);
        });
    }

    useError(route, callback) {

        if(arguments.length < 2)
            callback = route, route = '';

        _App.use(route, (error, req, res, next) => {

            callback(error, req, res, next);
        });
    }

    set(set, n) {

        _App.set(set, n);
    }

    stack() {

        let out = [];

        for(let i = 0; i < _App._router.stack.length; i++) {

            if(_App._router.stack[i].name === 'bound dispatch')
                out.push(_App._router.stack[i].route);
        }

        return out;
    }

    _getMiddlewares(middleware) {

        let out = [];

        for(let i = 0; i < middleware.length; i++) {
            
            if(_container.middlewares[middleware[i]] !== undefined)
                out.push(_container.middlewares[middleware[i]]['Run']);
        }
        
        return out;
    }

    _getController(controller) {

        let arr = null;

        arr = controller.split('@');

        return _container.controllers[arr[0]][arr[1]];
    }
}

module.exports = new Router();