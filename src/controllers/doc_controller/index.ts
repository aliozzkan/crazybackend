import {
  JsonController,
  Get,
  Res,
  getMetadataArgsStorage,
} from "routing-controllers";

import { DocServices } from "../../services/docServices";

@JsonController("/doc")
class DocController {
  docServices: DocServices = new DocServices();
  @Get("/")
  openApiSchema(@Res() res: { send: (data: any) => {} }) {
    const spec = this.docServices.getOpenApiDoc();
    return res.send(spec);
  }
}

export default DocController;