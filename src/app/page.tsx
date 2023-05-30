"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import AlertList from "@/components/Alerts/AlertList";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useRouter } from "next/navigation";
import { metadata } from "@/data/metadata";
import NavigationalBar from "@/components/Navigation/NavigationalBar";

type CredentialsType = {
  username: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState("");
  const [userName, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username: userName,
      password: pass,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/system");
      return;
    }

    setLoading(false);
  };

  if (session) {
    router.push("/system");
  }

  return (
    <main
      aria-label="Main"
      className="flex bg-light h-screen items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
    >
      {/* <NavigationalBar /> */}
      <div className="flex bg-light-dark items-center justify-center shadow-lg w-full px-6 py-24 max-w-3xl rounded-2xl">
        <form
          className="flex flex-col gap-4 max-w-md flex-1 "
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
        >
          <div className="text-2xl font-semibold text-primary-dark">
            {metadata.title}
          </div>
          {error != "" && <AlertList data={[error]} />}

          <div className="col-span-6">
            <label htmlFor="Username" className="label">
              Username
            </label>

            <input
              type="text"
              id="Username"
              name="username"
              className="input"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Password" className="label">
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              className="input"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button className="btn-primary" type="submit" disabled={loading}>
              Login
            </button>
          </div>
          {loading && <LoadingSpinner />}
        </form>
      </div>
    </main>
  );
};

export default Login;
