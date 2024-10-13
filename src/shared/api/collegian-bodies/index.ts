import { customFetch } from "@/src/shared/api";

const path = "prof-collegian-bodies-view/";
export const CreateCollegianBodies = (body: Record<string, string>) => {
  return customFetch({ path, method: "POST", body: { json: body } });
};

export const GetCollegianBodies = () => {
  return customFetch({ path: `${path}`, method: "GET" });
};
export const DeleteCollegianBodies = (id: string) => {
  return customFetch({ path: `${path}${id}/`, method: "DELETE" });
};
