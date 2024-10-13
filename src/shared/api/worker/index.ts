import { customFetch } from "@/src/shared/api";

export const CreateWorker = (body: Record<string, string>) => {
  return customFetch({
    method: "POST",
    path: "prof-member-view/",
    body: { multipart: body },
  });
};
export const PatchWorker = ({
  body,
  id,
}: {
  body: Record<string, string>;
  id: string;
}) => {
  return customFetch({
    method: "PATCH",
    path: `prof-member-view/${id}/`,
    body: { multipart: body },
  });
};
export const GetWorker = (id: string) => {
  return customFetch({
    method: "GET",
    path: `prof-member-view/${id}`,
  });
};
export const GetWorkersByBin = (bin: string) => {
  return customFetch({
    method: "GET",
    path: `prof-member-view`,
    query: {
      prof_id: bin,
    },
  });
};
