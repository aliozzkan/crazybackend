import { LoginBody, RegisterBody } from "./types";
import { Crpyto } from "../../helper/crpyto";
import { UserRepository } from "../../repositories/user-repository";
import { JwtToken } from '../../helper/jwt'

export class UserServices {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(body: RegisterBody): Promise<boolean> {
    const hashedPass = await Crpyto.doHash(body.password);
    const id = await this.userRepository.addUser({
      email: body.email,
      password: hashedPass,
    });
    return id !== -1;
  }

  async login(body: LoginBody): Promise<string | null> {
    const user = await this.userRepository.getUserByEmail(body.email);
    if (!user) {
      return null;
    }

    const isVerified = await Crpyto.isVerify(body.password, user.password);

    if (!isVerified) return null;

    const token = JwtToken.createJwt({id: user.id!, email: user.email});

    return token;
  }
}
