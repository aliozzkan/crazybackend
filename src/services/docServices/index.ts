import {
  getMetadataArgsStorage,
} from "routing-controllers";

import { routingControllersToSpec  } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";


export class DocServices {
  getOpenApiDoc() {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
    });
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      {},
      {
        components: { schemas, securitySchemes: {
          bearerAuth: {
            type:   'http',
            scheme: 'bearer',
          }
        },
        
         },
         security: [
           {
            bearerAuth: []
           }
         ],
        info: { 
          title: "Test", 
          version: "1.0.0",
          contact: {
            email: "aliozzkan@gmail.com",
            name: "Ali Ozkan",
          },
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
          },
        },
      }
    );
    return spec;
  }
}
