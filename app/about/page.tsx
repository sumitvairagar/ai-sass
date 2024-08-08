"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

export default function About() {
  const [user, setUser] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <Header
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => {}}
        onSignupClick={() => {}}
      />
      <div className="mt-16 bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          About Us
        </h1>
        <p className="text-gray-700">
          Welcome to the Plant Identifier platform. Our mission is to help you
          identify plants easily and provide detailed information about them.
          Whether you are a botany enthusiast or a professional, our platform is
          here to assist you.
        </p>
      </div>
    </div>
  );
}
