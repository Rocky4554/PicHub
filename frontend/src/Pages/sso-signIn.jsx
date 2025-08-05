// SsoCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';

const SsoCallback = () => {
  const { handleRedirectCallback } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSSO = async () => {
      try {
        await handleRedirectCallback();
        navigate('/');
      } catch (err) {
        console.error('SSO Callback failed:', err);
        navigate('/sign-in');
      }
    };

    handleSSO();
  }, []);

  return <p>Redirecting...</p>;
};

export default SsoCallback;
