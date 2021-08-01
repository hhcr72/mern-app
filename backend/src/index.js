require('dotenv').config(); //inporto variables de entorno
const app = require('./app');

require('./database'); //importo la conexion

//creo el servidor
async function main() {
    
    await app.listen(4000);
    console.log('Server on port ', app.get('port'));

}

main();