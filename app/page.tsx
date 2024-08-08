"use client";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import Header from "./components/Header";
import HomeContent from "./components/HomeContent";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const switchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLDivElement).id === "modal") {
      setShowLogin(false);
      setShowSignup(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <Header
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />
      <HomeContent
        user={user}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />
      {showLogin && (
        <div
          id="modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <Login
              onLogin={() => {
                setShowLogin(false);
              }}
              onSwitchToSignup={switchToSignup}
            />
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSignup && (
        <div
          id="modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <Signup
              onSignup={() => {
                setShowSignup(false);
              }}
              onSwitchToLogin={switchToLogin}
            />
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-2 right-2 text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
