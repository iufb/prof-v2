import { customFetch } from "@/src/shared/api";
const path = "auth/login/";
export const Login = (body: { username: string; password: string }) => {
  return customFetch({ method: "POST", path, body: { json: body } });
};
