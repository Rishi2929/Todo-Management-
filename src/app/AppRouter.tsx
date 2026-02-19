import { Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1 className="text-slate-600 text-center text-2xl">Todo Management</h1>
          </div>
        }
      />
    </Routes>
  );
};
