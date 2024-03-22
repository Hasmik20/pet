import { Toaster } from "@/components/ui/sonner";

import Footer from "@/components/dashboard/Footer";
import Header from "@/components/dashboard/Header";
import Navbar from "@/components/dashboard/Navbar";
import PetContextProvider from "@/context/PetContextProvider";
import SearchContextProvider from "@/context/SearchContextProvider";
import { deletePet, getPets } from "@/lib/actions";

const LayoutDashboard = async ({ children }: { children: React.ReactNode }) => {
  const data = await getPets();

  return (
    <main className="relative">
      <Header />
      <section className="max-w-[1300px] mx-auto px-4 flex flex-col min-h-screen">
        <Navbar />
        <PetContextProvider pets={data}>
          <SearchContextProvider>{children}</SearchContextProvider>
        </PetContextProvider>
        <Footer />
      </section>
      <Toaster position="top-right" />
    </main>
  );
};

export default LayoutDashboard;
