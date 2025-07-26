"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { HelpCircle, Globe, Play } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    if (username === "test@test.com" && password === "test") {
      // Store login state (in a real app, you'd use proper session management)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify({ username }))

      // Redirect to dashboard
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#EBF2FF] via-[#EBF2FF] to-[#EEEBFF]">
      {/* Left section */}
      <div className="flex-[3] relative">
        {/* Logo */}
        <div className="absolute left-[60px] top-[180px] w-[164px] h-[164px] opacity-100">
          <Image
            src="/suchama-logo-new.png"
            alt="Suchama.ai"
            width={164}
            height={164}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute left-[92px] top-[380px] max-w-lg">
          {/* Main Title */}
          <h1 className="text-5xl font-bold text-[#2C6ACE] mb-8 leading-tight">Suchama AI</h1>

          {/* Description */}
          <p className="text-xl text-gray-700 mb-12 leading-relaxed font-normal max-w-lg">
            Simplifying Manufacturing Supply Chain Planning & Scheduling Operations.
          </p>

          <Link
            href="http://suchama.ai/"
            target="_blank"
            className="inline-flex items-center gap-3 text-gray-800 hover:text-blue-600 font-medium underline text-base transition-colors"
          >
            Learn more about SUCHAMA.AI
            <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 fill-current" />
            </div>
          </Link>
        </div>
      </div>

      {/* Right section */}
      <div className="flex-[2] bg-[#F5F9FE] flex flex-col">
        {/* Header */}
        <div className="flex justify-end items-center p-6">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button className="flex items-center gap-2 hover:text-gray-700 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Need Help?
            </button>
            <button className="flex items-center gap-2 hover:text-gray-700 transition-colors">
              <Globe className="w-4 h-4" />
              English
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-sm">
            {/* Form Header */}
            <div className="mb-8">
              <p className="text-gray-500 mb-2 text-sm">Welcome back!</p>
              <h2 className="text-xl font-semibold text-gray-900">Login to get started</h2>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#2C2C2C] hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center">
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
