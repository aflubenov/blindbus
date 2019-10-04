var express = require('express');
var router = express.Router();
const request = require('request');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/getparada/:pParada/:pEntidad', function(req, res, next) {
    //res.send(req.params);

    obtenerColectivos(req.params.pParada, req.params.pEntidad, res);
});


var obtenerColectivos = function (pParada, pEntidad, res) {

  request('http://emr.gov.ar/ajax/cuandollega/getSmsResponseEfisat.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "parada=" + pParada + "&linea=&entidad=" + pEntidad + "&accion=getSmsEfisat"
  }, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      var tmp = body.substr(body.indexOf('JSONcoordenadas = eval(') + 23);
      tmp = tmp.substr(0, tmp.lastIndexOf("recorridos = (") - 24);


      console.log('body:', tmp); // Print the HTML for the Google homepage.

      res.send(tmp);
  });
}


module.exports = router;
