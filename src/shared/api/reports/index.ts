import { customFetch } from "@/src/shared/api";

const path = "report-view/";

export const CreateReport = (body: Record<string, string>) => {
  return customFetch({ method: "POST", path, body: { multipart: body } });
};

export const GetReports = () => {
  return customFetch({ method: "GET", path });
};

export const DeleteReport = (id: string) => {
  return customFetch({ method: "DELETE", path: `${path}${id}/` });
};
