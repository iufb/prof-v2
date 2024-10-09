import { Loader as LoaderIcon } from "lucide-react";
export const Loader = () => {
  return (
    <div className="flex justify-center py-5">
      <LoaderIcon className="animate-spin" size={48} />
    </div>
  );
};
