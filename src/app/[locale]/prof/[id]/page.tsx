export default function ProfPage({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
