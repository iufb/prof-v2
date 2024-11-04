"use client";
import { DeleteButton } from "@/src/features";
import { DeleteProf, GetTree } from "@/src/shared/api/prof";
import { Link } from "@/src/shared/config/routing";
import { queryClient } from "@/src/shared/lib/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Error,
  Loader,
} from "@/src/shared/ui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
export interface Prof {
  id: number;
  bin: string;
  industry: string | null;
  higher_union_org: string;
  union_name: string;
  union_type: string;
  addres: string;
  phone: string;
  website: string;
  email: string;
  chairman_name: string;
  children: Prof[];
}
export const Tree = () => {
  const { data, status } = useQuery({
    queryKey: ["tree"],
    queryFn: async () => {
      const data: Prof = await GetTree(getCookie("id") ?? null);
      if (getCookie("role") == "admin") {
        const industry: Prof = {
          id: -2,
          bin: "",
          industry: null,
          higher_union_org: "Нет",
          union_name: "Все отраслевые профсоюзы",
          union_type: "Отраслевой профсоюз",
          addres: "",
          phone: "",
          website: "",
          email: "",
          chairman_name: "",
          children: [],
        };
        const territory: Prof = {
          id: -1,
          bin: "",
          industry: null,
          higher_union_org: "Нет",
          union_name: "Все территориальные объединения профсоюзов",
          union_type: "Территориальное объединение профсоюзов",
          addres: "",
          phone: "",
          website: "",
          email: "",
          chairman_name: "",
          children: [],
        };
        data.children.forEach((child) => {
          if (child.union_type == territory.union_type) {
            territory.children.push(child);
          }
          if (child.union_type == industry.union_type) {
            industry.children.push(child);
          }
        });
        data.children = [industry, territory];
        return [data];
      }

      return [data];
    },
  });

  return (
    <section className="flex flex-col gap-4">
      {GetUI({
        status,
        length: data ? data.length : 0,
        ui: (
          <Accordion type="multiple" className="">
            {data && data.map((d) => <Branch key={d.id} prof={d} />)}
          </Accordion>
        ),
      })}
    </section>
  );
};

const Branch = ({ prof }: { prof: Prof }) => {
  const t = useTranslations("tree");
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete prof"],
    mutationFn: DeleteProf,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [`tree`],
      });
    },
  });
  return (
    <AccordionItem
      value={prof.union_name}
      className="ml-3 mt-3 border-slate-300 border-[1.5px]"
    >
      <AccordionTrigger className="text-md font-bold  ">
        <section className="flex justify-between items-center flex-1 mr-2 lg:mr-10">
          {prof.id > 0 ? (
            <div className="flex flex-col gap-2 text-start">
              <span className="text-gray-500">
                {t("type")} -{" "}
                <span className="text-gray-900">{prof.union_type}</span>
              </span>
              {prof.industry && (
                <span className="text-gray-500">
                  {t("industry")} -{" "}
                  <span className="text-gray-900">{prof.industry}</span>
                </span>
              )}

              <span className="text-gray-500">
                {t("name")} -{" "}
                <span className="text-gray-900">{prof.union_name}</span>
              </span>
            </div>
          ) : (
            <div>{prof.union_type}</div>
          )}
          {prof.id > 0 && (
            <div className="flex flex-col md:flex-row gap-3">
              {prof.children.length !== 0 && (
                <Link
                  className="p-2 h-fit rounded-md bg-black "
                  href={`/prof/${prof.id}?type=about`}
                >
                  <Eye color="white" aria-label="visit" />
                </Link>
              )}
              <DeleteButton
                btn={
                  <Button disabled={isPending} onClick={() => mutate(prof.id)}>
                    {t("delete")}
                  </Button>
                }
              />
            </div>
          )}
        </section>
      </AccordionTrigger>
      <AccordionContent className="">
        {prof.children.length == 0 ? (
          prof.id > 0 && (
            <Link href={`/prof/${prof.id}?type=about`}>{t("go")}</Link>
          )
        ) : (
          <Accordion type="multiple" className="mt-4">
            {prof.children.map((d) => (
              <Branch key={d.id} prof={d} />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
const GetUI = ({
  status: status,
  ui,
  length,
}: {
  status: string;
  ui: ReactNode;
  length: number;
}) => {
  const tGlobal = useTranslations();
  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return length == 0 ? (
        <span>{tGlobal("tree.notFound")}</span>
      ) : (
        <Error className="p-3">{tGlobal("get.error")}</Error>
      );
    case "success":
      return ui;
  }
};
