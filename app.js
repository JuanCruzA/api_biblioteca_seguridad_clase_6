const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 3000;

const errorHandler = require('./middlewares/errorHandler');

const autenticacion = auth({
    audience: "http://127.0.0.1:3000/api/libros",
    issuerBaseURL: "https://dev-w2g81fcfrr0gpyhy.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

const app = express();
app.use(express.json());

const librosRouter = require('./routes/libros');

//autenticar
app.use('/libros', autenticacion, librosRouter);
app.use(errorHandler);



//app.get('/authorized', function (req, res) {
//    res.send('Secured Resource');
//});

app.listen(3000, () => {
    console.log('el sv ha iniciado');
});