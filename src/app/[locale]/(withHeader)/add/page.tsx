import { AddProfForm, AddWorkerForm } from "@/src/features";

export default function AddPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return (
    <section className="py-10 grid place-items-center">
      {getForm(searchParams.type)}
    </section>
  );
}

const getForm = (type: string) => {
  switch (type) {
    case "prof":
      return <AddProfForm />;
    case "worker":
      return <AddWorkerForm />;
    default:
      return <div>Not found</div>;
  }
};
