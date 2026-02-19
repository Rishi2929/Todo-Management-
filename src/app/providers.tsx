import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
          <Toaster position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};
