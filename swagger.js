const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api',
        decription: 'Users Api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.jason';
const endpoitonsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
