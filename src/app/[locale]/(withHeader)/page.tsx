import { ProfInfo } from "@/src/widgets";
import { headers } from "next/headers";

export default function HomePage() {
  const headerlist = headers();
  const url = headerlist.get("x-url") || "";
  return (
    <div>
      <ProfInfo url={url} />
    </div>
  );
}
