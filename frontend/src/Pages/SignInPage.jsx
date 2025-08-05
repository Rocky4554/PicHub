
import { SignIn } from "@clerk/clerk-react";


const SignInPage = () => {
  return (
    <div className="h-full flex items-center justify-center p-20">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/sample"
        signInFallbackRedirectUrl="/show-signup-message"
      />
    </div>
  );
};

export default SignInPage;
