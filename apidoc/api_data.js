define({ "api": [
  {
    "type": "get",
    "url": "/superonce/:year/:month",
    "title": "Petición de sorteos",
    "name": "ONCE",
    "group": "Superonce",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Año.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>Mes.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>año del sorteo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mes",
            "description": "<p>mes del sorteo.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dia",
            "description": "<p>dia del sorteo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "numeros",
            "description": "<p>numeros del sorteo.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    year: 2018,\n    month: \"septiembre\"\n},\n{\n    fecha: \"sábado 1 de septiembre\",\n    num: {\n        numeros: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DataError",
            "description": "<p>El mes y/o año son incorrectos o estan fuera de rango</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"error\": \"Comprueba que el año es mayor o igual a xxxx e inferior o igual a xxxx y que el mes es correcto.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./superonce.js",
    "groupTitle": "Superonce"
  }
] });
