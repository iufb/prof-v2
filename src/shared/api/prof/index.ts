import { customFetch } from "@/src/shared/api";
const path = "prof-view/";
export const CreateProf = (body: Record<string, string>) => {
  return customFetch({
    method: "POST",
    path,
    body: { json: body },
  });
};
export const GetProf = (bin: string) => {
  return customFetch({ method: "GET", path: `${path}${bin}` });
};

export const PatchProf = ({
  body,
  bin,
}: {
  body: Record<string, string>;
  bin: string;
}) => {
  return customFetch({
    method: "PATCH",
    path: `${path}/${bin}/`,
    body: { json: body },
  });
};
