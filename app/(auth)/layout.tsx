import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Auth pages",
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="w-full font-SFPro">{children}</div>;
};

export default AuthLayout;

