"use client";

import api from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

interface RegisterForm {
  username: string;
  password: string;
  shops: string[];
  remember: boolean;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    password: "",
    shops: ["", "", ""],
    remember: false,
  });
  const [error, setError] = useState<string>("");
  const handleShopChange = (i: number, value: string) => {
    const updatedShops = [...form.shops];
    updatedShops[i] = value;
    setForm({ ...form, shops: updatedShops });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/register", form, { withCredentials: true });
      await api.post(
        "/login",
        {
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
      );
      router.push("/dashboard");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = (
          err as { response?: { data?: { message?: string } } }
        ).response;
        setError(errorResponse?.data?.message || "Signup failed");
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 w-full max-w-xl">
        <div className="px-10 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Welcome
              </span>
            </h1>
            <p className="text-gray-400">Register now</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-500 pl-10"
                placeholder="User Name"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-500 pl-10"
                placeholder="Password"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {form.shops.map((shop, i) => (
              <div className="relative" key={i}>
                <input
                  className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent outline-none transition-all duration-300 text-white placeholder-gray-500 pl-10"
                  placeholder={`Shop ${i + 1}`}
                  value={shop}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleShopChange(i, e.target.value)
                  }
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
            <div className="flex items-center">
              <div className="relative flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, remember: e.target.checked })
                    }
                    className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500 focus:ring-2"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="remember-me"
                    className="font-medium text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded p-2 mt-3 w-full hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                href="/"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
