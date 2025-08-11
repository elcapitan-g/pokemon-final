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

// this will gen swagger json
swaggerAutogen(outputFile, endpointsFiles, doc);
