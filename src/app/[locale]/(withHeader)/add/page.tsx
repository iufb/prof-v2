import {
  AddAwardForm,
  AddProfCollegiateBodiesForm,
  AddProfForm,
  AddReportForm,
  AddSocialPartnershipAgreementsForm,
  AddWorkerForm,
} from "@/src/features";

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
    case "awards":
      return <AddAwardForm />;

    case "soc":
      return <AddSocialPartnershipAgreementsForm />;
    case "report":
      return <AddReportForm />;
    case "bodies":
      return <AddProfCollegiateBodiesForm />;
    default:
      return <div>Not found</div>;
  }
};
