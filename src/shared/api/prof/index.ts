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
export const DeleteProf = (bin: number) => {
  return customFetch({ method: "DELETE", path: `${path}${bin}/` });
};

export const SearchProfs = (query: Record<string, string>) => {
  if (Object.keys(query).length == 0) return [];
  return customFetch({ method: "GET", path, query });
};
export const GetAllProf = () => {
  return customFetch({ method: "GET", path });
};
export const GetTree = async (id: string | null) => {
  return customFetch({ method: "GET", path: `${path}${id ? id : 1}` });
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
    path: `${path}${bin}/`,
    body: { json: body },
  });
};
