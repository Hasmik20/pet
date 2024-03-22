import Logo from "@/components/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" flex items-center justify-center gap-y-4 flex-col min-h-screen">
      <Logo />
      {children}
    </main>
  );
};

export default AuthLayout;
