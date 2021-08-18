import { JsonController, Post, Body, Res, Get, CurrentUser, Authorized } from "routing-controllers";
import { UserServices } from "../../services/user-services";
import { Endpoint, Status } from "../../helper/response-creater";
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, MeResponse } from "./types";
import { ResponseSchema } from "routing-controllers-openapi";
import {Response} from 'express'
import { User } from "../../db/entity/User";

@JsonController("/user")
class UserController {
  userService: UserServices = new UserServices();

  @Post("/register")
  @ResponseSchema(RegisterResponse)
  async register(
    @Body() body: RegisterRequest,
    @Res() res: Response
  ) {
    const status = await this.userService.register({ ...body });
    const response = new RegisterResponse();

    if(status) {
      response.message = "register success";
    } else {
      response.message = "register failed";
    }
    return res.json(response).status(200);
  }

  @Post("/login")
  @ResponseSchema(LoginResponse)
  async login(
    @Body() body: LoginRequest,
    @Res() res: Response
  ) {
    const token = await this.userService.login({...body});
    const response = new LoginResponse();
    response.data = token!;
    response.message = "logged";
    res.json(response).status(200);
  }

  @Authorized()
  @Get("/me")
  @ResponseSchema(MeResponse)
  async me(@CurrentUser() user: User, @Res() res: Response) {
    return res.json({data: user}).status(200);
  }
}

export default UserController;
