"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
      setLoading(false);
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-3 font-bold text-2xl">
        {loading ? "Processing..." : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username" className="font-semibold text-base pb-1">
        Username
      </label>
      <input
        id="username"
        type="text"
        className="py-2 px-3 rounded-sm outline-0 text-black"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-3"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit login Signup</Link>
    </div>
  );
}
