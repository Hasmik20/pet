import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

const SignInPage = () => {
  return (
    <main>
      <h2 className="text-2xl text-gray-600 mt-3 mb-2 font-semibold text-center">
        LogIn
      </h2>
      <AuthForm type="login" />
      <p>
        No account yet?
        <Link href="/sign-up" className="font-bold">
          {" "}
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default SignInPage;
