export default function WorkerPage({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
