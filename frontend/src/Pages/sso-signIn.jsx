
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth} from "@clerk/clerk-react";

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate("/sample");
      } else {
        navigate("/sign-up");
      }
    }
  }, [isLoaded, isSignedIn]);

  return <p>Processing SSO login...</p>;
}
