interface VerticalTableProps {
  labels: string[];
  values: string[];
}
export const VerticalTable = ({ labels, values }: VerticalTableProps) => {
  return (
    <ul className="flex gap-4 flex-col w-full">
      {labels.map((l, key) => (
        <li
          key={key}
          className="flex flex-col md:flex-row items-center rounded-sm border border-slate-300"
        >
          <span className="text-lg text-center md:text-start w-full bg-gray-100 px-2 py-1  md:w-[40%]">
            {l}
          </span>
          <span className="pl-2 text-md">{values[key]}</span>
        </li>
      ))}
    </ul>
  );
};
