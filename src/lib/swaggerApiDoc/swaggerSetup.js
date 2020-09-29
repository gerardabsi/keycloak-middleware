module.exports = class SwaggerSetup {
  constructor(express, swaggerUi, swaggerJSDoc) {
    this.express = express;
    this.swaggerUi = swaggerUi;
    this.swaggerJSDoc = swaggerJSDoc;

    return this.initializeRouter();
  }

  initializeRouter() {
    const path = __dirname.split('/');
    const dir = path.slice(0, path.length - 1).join('/');
    const router = this.express.Router();
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Keycloak Middleware Identity Provider API Specs',
          version: '1.0.0',
          contact: {
            name: '',
            email: ''
          }
        }
      },
      servers: [],
      apis: [
        `${dir}/**/definition.yml`
      ]
    };
    const swaggerSpec = this.swaggerJSDoc(options);
    router.use(
      '/',
      this.swaggerUi.serve,
      this.swaggerUi.setup(swaggerSpec, { explorer: true })
    );
    return router;
  }
};
