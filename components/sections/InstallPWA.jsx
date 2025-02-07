import { useEffect, useState } from 'react';
import "./installPWA.css";
import {useAuth} from '../context/AuthContext'

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const {session} = useAuth();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // Show the custom install popup
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowPrompt(false); // Hide the prompt after user interaction
      });
    }
  };

  if(!session){
    return null;
  }

  return (
    <>
      {showPrompt && (
        <div className="pwa-install-popup">
          <p>Install our app for a better experience!</p>
          <button onClick={handleInstallClick}>Install</button>
          <button onClick={() => setShowPrompt(false)}>Maybe Later</button>
        </div>
      )}
    </>
  );
}
