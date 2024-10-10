import { customFetch } from "@/src/shared/api";

const path = "report-view/";

export const CreateReport = (body: Record<string, string>) => {
  return customFetch({ method: "POST", path, body: { multipart: body } });
};
