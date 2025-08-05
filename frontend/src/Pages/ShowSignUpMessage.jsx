import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowSignupMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/sign-up?newUser=true");
    }, 3000); // Wait 3 seconds then go to sign-up

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white flex-col gap-4">
      <h2 className="text-lg font-semibold text-yellow-400">
        🚫 You're not registered yet.
      </h2>
      <p>Please sign up to continue. Redirecting...</p>
    </div>
  );
};

export default ShowSignupMessage;
