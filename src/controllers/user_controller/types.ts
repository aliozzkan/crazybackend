import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsJWT } from "class-validator";
import { ApiResponse } from '../types'
import { User} from '../../db/entity/User'

export class RegisterRequest {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}

export class RegisterResponseData {
  @IsNumber()
  value: number;
}

export class RegisterResponse implements ApiResponse<User> {
  @ValidateNested() data: User;
  @IsString() message: string;
} 

export class LoginRequest {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}

export class LoginResponse implements ApiResponse<string> {
  @IsJWT() data: string;
  @IsString() message: string;
}

export class MeResponse implements ApiResponse<User> {
  @ValidateNested() data: User;
  @IsString() message: string;
}