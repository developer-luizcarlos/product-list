import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode; }) {
  return (
    <div className="w-4/5 mx-auto py-9">
      {children}
    </div>
  );
}