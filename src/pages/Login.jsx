// Login.jsx
// Page: User login for FOSSEE Workshop portal
// Handles: Username/password input, show/hide password toggle, navigation links

import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  // Track form input values
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })

  // Update formData state on every input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">

      {/* ── Navbar ── */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center" aria-hidden="true">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">FOSSEE Workshops</span>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Home</Link>
          <Link to="/statistics" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Workshop Statistics</Link>
        </div>
      </nav>

      {/* ── Main Login Card ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Branding header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" aria-hidden="true">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your FOSSEE account</p>
          </div>

          {/* Login form card */}
          <div className="bg-white rounded-2xl shadow-xl p-8" role="form" aria-label="Login form">

            {/* Username input */}
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all text-sm"
              />
            </div>

            {/* Password input with show/hide toggle */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all text-sm pr-12"
                />
                {/* Toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 text-xs font-medium transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              aria-label="Sign in to your account"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="flex items-center my-6" aria-hidden="true">
              <div className="flex-1 border-t border-gray-100"></div>
              <span className="px-3 text-xs text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>

            {/* Secondary links */}
            <div className="flex flex-col gap-3 text-center">
              <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                New around here? <span className="underline">Sign up</span>
              </Link>
              <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Footer credit */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Developed by FOSSEE group, IIT Bombay
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login