import { customFetch } from "@/src/shared/api";

export const CreateWorker = (body: Record<string, string>) => {
  return customFetch({
    method: "POST",
    path: "prof-member-view/",
    body: { multipart: body },
  });
};
