import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
