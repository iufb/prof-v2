"use client";
import { queryClient } from "@/src/shared/lib/client";
// _app.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

// NEVER DO THIS:
// const queryClient = new QueryClient()
//
// Creating the queryClient at the file root level makes the cache shared
// between all requests and means _all_ data gets passed to _all_ users.
// Besides being bad for performance, this also leaks any sensitive data.

export function QueryProvider({ children }: { children: ReactNode }) {
  // Instead do this, which ensures each request has its own cache:
  const [queryClientState] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientState}>
      {children}
    </QueryClientProvider>
  );
}
