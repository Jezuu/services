/*
|--------------------------------------------------------------------------
| AutoLoad
|--------------------------------------------------------------------------
*/

const fs = require('fs');
const path = require('path');

class AutoLoad {

    constructor() {

        this.Name = 'AutoLoad';
        this.Version = '1.0';
        this.Methods = {

            include: this.include,
        }
    }

    include(modules, dir) {

        const pathController = path.join(process.cwd(), '/' + dir);

        dir.split('/').forEach(async(element, index, array) => {

            if(index === array.length - 1) {

                modules[element] = {};

                await fs.readdirSync(pathController).forEach((file) => {

                    if(modules[element]) {

                        try {
                            
                            modules[element][file.split('.').slice(0, -1).join('.')] = require(pathController + '/' + file);
                            global[file.split('.').slice(0, -1).join('.')] = require(pathController + '/' + file);
                        }
                        catch (e) {

                            console.log(e.message, ', ', e.code);
                        }
                    }
                });
            }
        });
    }
}

module.exports = new AutoLoad();