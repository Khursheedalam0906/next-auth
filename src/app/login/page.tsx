"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Signup Success", response.data);
      router.push("/profile");
      setLoading(false);
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-3 font-bold text-2xl">
        {loading ? "Processing..." : "Login"}
      </h1>
      <hr />
      <label htmlFor="email" className="font-semibold text-base pb-1">
        email
      </label>
      <input
        id="email"
        type="email"
        className="py-2 px-3 rounded-sm outline-0 text-black"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password" className="font-semibold text-base pb-1">
        Password
      </label>
      <input
        id="password"
        type="text"
        className="py-2 px-3 rounded-sm outline-0 text-black"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-3"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit signup Login</Link>
    </div>
  );
}
