/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
*/

const AutoLoad = require('../core/Autoload');
const container = {};

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

class App {

    constructor() {

    	this.Name = 'App';
        this.Version = '1.0';

        AutoLoad.include(container, 'core');
        AutoLoad.include(container, 'config');
        AutoLoad.include(container, 'app/http/middlewares');
        AutoLoad.include(container, 'app/http/controllers');
    }

    Init() {

        this._before();

        Route.Init(container);

        Route.set('json spaces', 4);

        Route.use((req, res, next) => {
            res.removeHeader("X-Powered-By");
            next();
        });

        AutoLoad.include(container, 'routes');

        Route.use((req, res, next) => {
            res.status(404).end();
        });

        Route.useError((error, req, res, next) => {
            console.error(error.stack);
            res.status(500).end();
        });

        this._after();
    }

    _before() {
    	
        Env;
    }

    _after() {

        DB.connect(Database);

        Route.listen(process.env.APP_PORT || 8080);
    }
}

module.exports = new App();

// args.Init(
// {
//     method: {
//         dbList: config.dbList,
//         routeList: routes.routeList
//     }
// },
// {
//     object: {
//         db: config.db,
//         route: app._router.stack
//     }
// });