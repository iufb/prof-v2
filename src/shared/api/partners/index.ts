import { customFetch } from "@/src/shared/api";
const path = "social-partnership-view/";
export const CreatePartnership = (body: Record<string, string>) => {
  return customFetch({ method: "POST", path, body: { json: body } });
};
export const GetPartnerships = () => {
  return customFetch({ method: "GET", path });
};

export const DeletePartnership = (id: string) => {
  return customFetch({ method: "DELETE", path: `${path}${id}/` });
};
