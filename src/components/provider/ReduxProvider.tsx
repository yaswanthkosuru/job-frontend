"use client";
import { Provider } from "react-redux";
import { store } from "@/app/store";
export default function Reduxprovider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
