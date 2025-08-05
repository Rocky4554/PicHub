
import { SignIn } from "@clerk/clerk-react";


const SignInPage = () => {
  return (
    <div className="h-full flex items-center justify-center p-20">
      {/* <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/sample"
        signInFallbackRedirectUrl="/show-signup-message"
      /> */}

      <SignIn 
        signUpUrl="/sign-up"
        afterSignInUrl="/sample"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  );
};

export default SignInPage;
