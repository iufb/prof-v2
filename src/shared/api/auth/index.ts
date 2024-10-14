import { customFetch } from "@/src/shared/api";
const path = "auth/login/";
export const Login = (body: { username: string; password: string }) => {
  return customFetch({ method: "POST", path, body: { json: body } });
};

export const CreatePass = (body: { username: string }) => {
  return customFetch({
    method: "POST",
    path: "register/",
    body: { json: body },
  });
};

export const RestorePass = async (id: string) => {
  const { uid, token } = await customFetch({
    method: "POST",
    path: "generate_reset_token/ ",
    body: { multipart: { username: id } },
  });
  return customFetch({
    method: "POST",
    path: "reset_password/",
    body: { multipart: { uid, token } },
  });
};
