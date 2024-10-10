interface VerticalTableProps {
  labels: string[];
  values: string[];
}
export const VerticalTable = ({ labels, values }: VerticalTableProps) => {
  return (
    <ul className="flex gap-4 flex-col w-full">
      {labels.map((l, key) => (
        <li key={key} className="flex items-center border border-slate-300">
          <span className="text-lg bg-slate-200 px-2 py-1 font-bold w-[40%]">
            {l}
          </span>
          <span className="pl-2 text-md">{values[key]}</span>
        </li>
      ))}
    </ul>
  );
};
