import Link from "next/link";
import Head from "next/head";
import CenteredForm from "../../layouts/centered-form";
import ForgotPassword from "../../components/sample-forms/forgot-password";

const Index = () => {
  return (
    <>
      <Head>
        <title>Admin | Forgot Password</title>
      </Head>
      <CenteredForm
        title="Forgot password"
        subtitle="Please enter your email address"
      >
        <ForgotPassword message="Thanks for your message. We'll get back to you as soon as possible" />
        <div className="w-full mt-2">
          <span>
            <Link href="/admin">
              <a className="link">Go back to login</a>
            </Link>
          </span>
        </div>
      </CenteredForm>
    </>
  );
};

export default Index;
