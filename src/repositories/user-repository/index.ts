import { User } from "../../db/entity/User";
import { AddUserBody, AddUserRes } from "./types";

export class UserRepository {
  async addUser(body: AddUserBody): AddUserRes {
    const newUser = new User();
    newUser.email = body.email;
    newUser.password = body.password;

    try {
      await newUser.save();
      if (newUser.hasId()) {
        return newUser.id!;
      }
    } catch (error) {}

    return -1;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if(!user) return null;

    return user;
  }
}
