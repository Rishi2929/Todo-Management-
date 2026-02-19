import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black/40 md:hidden">
          <div className="w-64 bg-white h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Mobile Topbar */}
        <div className="md:hidden p-4 border-b bg-white flex items-center">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
