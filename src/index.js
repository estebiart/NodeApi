const express = require('express');
const app = express();
const morgan =require('morgan');
// setting
app.set('port', process.env.PORT ||3000);
app.set('json spaces',2);

//middleware
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use(require('.routes/index'));
app.use(require('.routes/hoteles'));
//start
app.listen(app.get('port'), () => {
    console.log('Server on port  ${3000}');
});
