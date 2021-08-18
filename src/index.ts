import "reflect-metadata"; // this shim is required
import express from "express";
import { createExpressServer } from "routing-controllers";
import {SwaggerUiOptions} from 'swagger-ui-express'

import Controllers from "./controllers";
import { Options } from "./helper/authorization";
import { CustomErrorHandler } from "./helper/error-handler";

import "./db/configuration";
import { DocServices } from "./services/docServices";

const swaggerUi = require('swagger-ui-express');
const swaggerUiOptions: SwaggerUiOptions = {
  explorer: false,
  isExplorer: false,
  customSiteTitle: "CrazyBackend"
}

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: Controllers,
  middlewares: [CustomErrorHandler],
  authorizationChecker: Options.authorizationChecker,
  currentUserChecker: Options.currentUserChecker,
  defaultErrorHandler: false,
});

const docServices: DocServices = new DocServices();

const swaggerDocument = docServices.getOpenApiDoc();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

app.use("/uploads", express.static("uploads"));

// run express application on port 3000
app.listen(3000);
