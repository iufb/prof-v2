import { customFetch } from "@/src/shared/api";
import { Vacation } from "@/src/shared/lib/types";

const path = "vacation-view/";

export const CreateVacation = (body: Vacation) => {
  return customFetch({ method: "POST", path, body: { json: body } });
};
export const GetVacations = (id: string | null | undefined) => {
  return customFetch({
    method: "GET",
    path: `awards-vacation-prof-member-id-view`,
    query: {
      type: "vacation",
      prof_member_id: id,
    },
  });
};
export const DeleteVacation = (id: string) => {
  return customFetch({
    method: "DELETE",
    path: `${path}${id}/`,
  });
};
