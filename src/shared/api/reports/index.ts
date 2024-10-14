import { customFetch } from "@/src/shared/api";

const path = "report-view/";

export const CreateReport = (body: Record<string, string>) => {
  return customFetch({ method: "POST", path, body: { multipart: body } });
};

export const GetReports = (id: string) => {
  return customFetch({
    method: "GET",
    path: `${path}`,

    query: { prof_id: id },
  });
};

export const DeleteReport = (id: string) => {
  return customFetch({ method: "DELETE", path: `${path}${id}/` });
};
