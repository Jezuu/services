/*
|--------------------------------------------------------------------------
| HelloController
|--------------------------------------------------------------------------
*/

class HelloController
{
    Hello(req, res) {
    	
        res.status(200).send("Hi!");
    }
};

module.exports = new HelloController();
