import { customFetch } from "@/src/shared/api";

export const CreateProf = (body: Record<string, string>) => {
  return customFetch({
    method: "POST",
    path: "prof-view/",
    body: { json: body },
  });
};
