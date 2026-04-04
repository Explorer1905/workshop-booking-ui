// Register.jsx
// Page: New coordinator registration for FOSSEE Workshop portal
// Features: 3-step form (Account → Personal → Institute), progress indicator, success state

import { useState } from 'react'
import { Link } from 'react-router-dom'

// Step labels for the progress indicator
const steps = ['Account', 'Personal', 'Institute']

function Register() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: '',
    title: 'Prof.', firstName: '', lastName: '', phone: '',
    institute: '', department: 'Computer Science', city: '', state: '', pincode: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const next = () => setStep(s => Math.min(s + 1, 2))
  const prev = () => setStep(s => Math.max(s - 1, 0))

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

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Register as a Workshop Coordinator</p>
          </div>

          {/* ── Step Progress Indicator - hidden on success ── */}
          {!submitted && (
            <div className="flex items-center justify-between mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${step + 1} of 3: ${steps[step]}`}>
              {steps.map((label, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${i < step ? 'bg-indigo-600 text-white' : i === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-200 text-gray-500'}`}
                    aria-current={i === step ? 'step' : undefined}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${i <= step ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Form Card ── */}
          <div className="bg-white rounded-2xl shadow-xl p-8">

            {/* ── SUCCESS STATE ── shown after form submission */}
            {submitted && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <span className="text-green-600 text-3xl">✓</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Account Created!</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Your registration was successful. You can now sign in.
                </p>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Go to Sign In
                </Link>
              </div>
            )}

            {/* ── STEP 1: Account Details ── */}
            {!submitted && step === 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Account Details</h2>
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                  <input id="username" name="username" type="text"
                    value={formData.username} onChange={handleChange}
                    placeholder="Letters, digits, period and underscore only"
                    aria-required="true" autoComplete="username"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="your@email.com"
                    aria-required="true" autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input id="password" name="password" type="password"
                    value={formData.password} onChange={handleChange}
                    placeholder="Create a strong password"
                    aria-required="true" autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                  <input id="confirmPassword" name="confirmPassword" type="password"
                    value={formData.confirmPassword} onChange={handleChange}
                    placeholder="Repeat your password"
                    aria-required="true" autoComplete="new-password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
            )}

            {/* ── STEP 2: Personal Details ── */}
            {!submitted && step === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Personal Details</h2>
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <select id="title" name="title"
                    value={formData.title} onChange={handleChange}
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                    <option>Prof.</option>
                    <option>Dr.</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Ms.</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input id="firstName" name="firstName" type="text"
                      value={formData.firstName} onChange={handleChange}
                      placeholder="First name"
                      aria-required="true" autoComplete="given-name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input id="lastName" name="lastName" type="text"
                      value={formData.lastName} onChange={handleChange}
                      placeholder="Last name"
                      aria-required="true" autoComplete="family-name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input id="phone" name="phone" type="tel"
                    value={formData.phone} onChange={handleChange}
                    placeholder="10-digit phone number"
                    aria-required="true" autoComplete="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
            )}

            {/* ── STEP 3: Institute Details ── */}
            {!submitted && step === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Institute Details</h2>
                <div>
                  <label htmlFor="institute" className="block text-sm font-semibold text-gray-700 mb-2">Institute Name *</label>
                  <input id="institute" name="institute" type="text"
                    value={formData.institute} onChange={handleChange}
                    placeholder="Full name of your Institute/Organisation"
                    aria-required="true" autoComplete="organization"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                  <select id="department" name="department"
                    value={formData.department} onChange={handleChange}
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Chemical</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input id="city" name="city" type="text"
                      value={formData.city} onChange={handleChange}
                      placeholder="City" aria-required="true"
                      autoComplete="address-level2"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input id="state" name="state" type="text"
                      value={formData.state} onChange={handleChange}
                      placeholder="State" aria-required="true"
                      autoComplete="address-level1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                  <input id="pincode" name="pincode" type="text"
                    value={formData.pincode} onChange={handleChange}
                    placeholder="6-digit pincode" aria-required="true"
                    autoComplete="postal-code"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>
            )}

            {/* ── Navigation Buttons - hidden on success ── */}
            {!submitted && (
              <div className="flex justify-between mt-8 gap-4">
                {step > 0 ? (
                  <button onClick={prev} aria-label="Go to previous step"
                    className="flex-1 py-3 rounded-xl border border-indigo-300 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    ← Back
                  </button>
                ) : (
                  <div className="flex-1" />
                )}
                {step < 2 ? (
                  <button onClick={next} aria-label="Go to next step"
                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Next →
                  </button>
                ) : (
                  <button onClick={() => setSubmitted(true)} aria-label="Submit registration form"
                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Create Account
                  </button>
                )}
              </div>
            )}

            {/* Link to login - hidden on success */}
            {!submitted && (
              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
              </p>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Developed by FOSSEE group, IIT Bombay
          </p>
        </div>
      </main>
    </div>
  )
}

export default Register