import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <main>
      <h2 className="text-2xl text-gray-600 mt-3 mb-2 font-semibold text-center">
        SignUp
      </h2>
      <AuthForm type="signUp" />
      <p>
        Have an account?
        <Link href="/sign-in" className="font-bold">
          {" "}
          Login
        </Link>
      </p>
    </main>
  );
};

export default SignUpPage;
