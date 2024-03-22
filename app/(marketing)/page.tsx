import Image from "next/image";
import { Button } from "@/components/ui/button";

import petHomeImg from "../../public/accets/petHome.jpg";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col md:flex-row min-h-screen bg-green-600 gap-4">
      <Image
        src={petHomeImg}
        // src={
        //   "https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        // }
        alt="pet"
        width={519}
        height={472}
        className="w-[380px] h-[400px] border-[10px] border-emerald-700 rounded-sm "
      />
      <section className="space-4">
        <Logo />
        <h1 className="font-semibold text-2xl lg:text-5xl max-w-[400px] my-6">
          Manage your <span className="font-bold">pet care </span> with ease
        </h1>
        <p className="text-xl text-inherit max-w-[500px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-6 space-x-4">
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/sign-in">Login</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
