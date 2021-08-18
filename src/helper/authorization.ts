import { Action, RoutingControllersOptions } from "routing-controllers";
import { User } from "../db/entity/User";
import { JwtToken } from "./jwt";

const authorizationChecker: RoutingControllersOptions["authorizationChecker"] = async (
  action: Action,
  roles: string[]
) => {
  const authorizationKey = action.request.headers["authorization"];
  if (!authorizationKey) {
    return false;
  }

  const token = authorizationKey.split(" ")[1];

  if(!token) {
    return false
  }

  if(!JwtToken.isVerify(token)) {
    return false
  } 

  const user = { id: 33333, name: "Ali Özkan", roles: ["ADMIN"] };
  if (user && !roles.length) return true;
  if (user && roles.find((role) => user.roles.indexOf(role) !== -1))
    return true;

  return false;
};

const currentUserChecker: RoutingControllersOptions["currentUserChecker"] = async (
  action: Action
) => {
  const authorizationKey = action.request.headers["authorization"];
  if (!authorizationKey) {
    return undefined;
  }

  const token = authorizationKey.split(" ")[1];

  if(!token) {
    return undefined;
  }

  if(!JwtToken.isVerify(token)) {
    return undefined;
  } 

  const decoded = JwtToken.getJwtData(token);

  if(!decoded.id) {
    return undefined;
  }

  const currUser = await User.findOne(decoded.id);
  return currUser;
};

export const Options = {
  authorizationChecker,
  currentUserChecker,
};
