import { createParamDecorator } from "routing-controllers";

export type Endpoint = (data: object, status: Status) => void;

export function Endpoint() {
  return createParamDecorator({
    required: false,
    value: (action) => {
      return (data: object, status: Status) => {
        action.response.json(data).status(status);
      };
    },
  });
}

export enum Status {
  success = 200,
  error = 400,
  forbidden = 403,
}
