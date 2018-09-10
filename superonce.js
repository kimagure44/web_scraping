/**
 * @api {get} /superonce/:year/:month Petición de sorteos
 * @apiName ONCE
 * @apiGroup Superonce
 *
 * @apiParam {Number} year Año.
 * @apiParam {String} month Mes.
 *
 * @apiSuccess {Number} year año del sorteo.
 * @apiSuccess {String} mes mes del sorteo.
 * @apiSuccess {String} dia dia del sorteo.
 * @apiSuccess {Array} numeros numeros del sorteo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         year: 2018,
 *         month: "septiembre"
 *     },
 *     {
 *         fecha: "sábado 1 de septiembre",
 *         num: {
 *             numeros: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
 *         }
 *     }
 *
 * @apiError DataError El mes y/o año son incorrectos o estan fuera de rango
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "Comprueba que el año es mayor o igual a xxxx e inferior o igual a xxxx y que el mes es correcto."
 *     }
 */
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = 13119;
app.get('/superonce/:year/:month', (req, res) => {
    let mes = req.params.month;
    let anio = parseInt(req.params.year);
    let anioMin = 2010;
    let anioMax = new Date().getFullYear();
    let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    if ((anio >= anioMin && anio <= anioMax) && meses.indexOf(mes) >= 0) {
        url = `https://www.juegosonce.es/historico-resultados-superonce-${mes}-${anio}`;
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                let combinaciones = [];
                combinaciones.push({ "year": anio, "month": mes });
                let $ = cheerio.load(html);
                let num = {};
                $("div.s11 ul").map((iM, vM) => {
                    let data = vM.parent.parent.firstChild.next.children;
                    let fecha = data[0].data.trim() + " " + data[1].firstChild.data.trim() + " " + data[2].next.firstChild.data + " " + data[4].data.split("\n")[1].trim();
                    num.numeros = vM.children.filter(a => a.type === "tag").map(v => parseInt(v.children[0].data));
                    combinaciones.push({ 'fecha': fecha, num });
                });
                res.send(JSON.stringify(combinaciones));
            }
        });
    } else {
        let error = JSON.stringify({ 'error': 400, 'detail': `Comprueba que el año es mayor o igual a ${anioMin} e inferior o igual a ${anioMax} y que el mes es correcto.` });
        res.send(error);
    }

});
app.listen(port);
console.log(`API REST SUPERONCE EN EL PUERTO....${port}`);