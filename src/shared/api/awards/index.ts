import { customFetch } from "@/src/shared/api";
import { Award } from "@/src/shared/lib/types";
const path = "awards-view/";
export const CreateAward = (body: Award) => {
  return customFetch({
    method: "POST",
    path,
    body: { json: body },
  });
};
export const GetAwards = (id: string | null | undefined) => {
  return customFetch({
    method: "GET",
    path: `awards-vacation-prof-member-id-view`,
    query: {
      type: "awards",
      prof_member_id: id,
    },
  });
};
export const DeleteAward = (id: string) => {
  return customFetch({
    method: "DELETE",
    path: `${path}${id}/`,
  });
};
