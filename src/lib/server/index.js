module.exports = class App {
  constructor(express, port, compression, bodyParser, cors, serverRouters, logger) {
    this.express = express;
    this.port = port;
    this.compression = compression;
    this.cors = cors;
    this.bodyParser = bodyParser;
    this.ServerRouters = serverRouters;
    this.logger = logger;
    return this.initializeServe();
  }

  initializeServe() {
    const app = this.express();
    app.use(this.bodyParser.json());
    app.use(this.bodyParser.urlencoded({ extended: true }));
    app.use(this.compression());
    app.use(this.cors());
    const router = new this.ServerRouters();
    router(app);
    app.listen(this.port, () => {
      this.logger.info(`server started on port ${this.port}`);
    });
    return app;
  }
};
