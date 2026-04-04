// Home.jsx
// Page: Landing page for FOSSEE Workshop portal
// Sections: Navbar, Hero, Stats Bar, Workshop Cards, CTA, Footer

import { Link } from 'react-router-dom'

// Summary statistics displayed in the stats bar
const stats = [
  { label: 'Workshops Conducted', value: '500+' },
  { label: 'States Covered', value: '28+' },
  { label: 'Coordinators', value: '1200+' },
  { label: 'Instructors', value: '80+' },
]

// Workshop cards data - each represents a bookable workshop type
const workshops = [
  { name: 'Python', desc: 'Learn Python programming from scratch with hands-on exercises.', tag: 'Programming' },
  { name: 'Scilab', desc: 'Open-source alternative to MATLAB for numerical computation.', tag: 'Scientific' },
  { name: 'OpenFOAM', desc: 'Computational fluid dynamics simulations using open-source tools.', tag: 'Engineering' },
  { name: 'Arduino', desc: 'Hands-on electronics and embedded systems with Arduino.', tag: 'Electronics' },
  { name: 'LaTeX', desc: 'Professional document preparation for research and academia.', tag: 'Tools' },
  { name: 'DWSIM', desc: 'Chemical process simulation using free and open-source software.', tag: 'Chemical' },
]

function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar ── sticky so it stays visible on scroll */}
      <nav
        className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center" aria-hidden="true">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">FOSSEE Workshops</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Home</Link>
          <Link to="/statistics" className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors">Workshop Statistics</Link>
          <Link
            to="/login"
            className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Sign in to your account"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── full-width banner with headline and CTA buttons */}
      <section
        className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white px-6 py-20 text-center"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 inline-block">
            IIT Bombay Initiative
          </span>

          {/* Main headline */}
          <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Book a FOSSEE Workshop at Your Institution
          </h1>

          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
            Connect with expert instructors and bring free, open-source software training to your college.
          </p>

          {/* CTA Buttons - stacked on mobile, side by side on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Register to book a workshop"
            >
              Book a Workshop
            </Link>
            <Link
              to="/statistics"
              className="border border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="View workshop statistics"
            >
              View Statistics
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── key numbers about the program */}
      <section className="bg-indigo-50 py-10 px-6" aria-label="Program statistics">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-indigo-600" aria-label={`${s.value} ${s.label}`}>
                {s.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Workshop Cards ── grid of available workshops */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full" aria-labelledby="workshops-heading">
        <div className="text-center mb-12">
          <h2 id="workshops-heading" className="text-3xl font-bold text-gray-900">
            Available Workshops
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            Explore our range of free and open-source software workshops
          </p>
        </div>

        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w, i) => (
            <article
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              aria-label={`${w.name} workshop`}
            >
              {/* Card header: icon + tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center" aria-hidden="true">
                  <span className="text-indigo-600 font-bold text-sm">{w.name[0]}</span>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-1 rounded-full">
                  {w.tag}
                </span>
              </div>

              {/* Card body */}
              <h3 className="font-bold text-gray-800 text-lg mb-2">{w.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{w.desc}</p>

              {/* CTA link */}
              <Link
                to="/register"
                className="text-indigo-600 text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label={`Book ${w.name} workshop`}
              >
                Book this workshop →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── bottom call-to-action section */}
      <section
        className="bg-indigo-600 text-white py-16 px-6 text-center"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-2xl mx-auto">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">
            Ready to host a workshop?
          </h2>
          <p className="text-indigo-100 mb-8 text-sm">
            Register as a coordinator and bring FOSSEE workshops to your institution for free.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-lg inline-block focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Get started by registering as a coordinator"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-xs" role="contentinfo">
        Developed by FOSSEE group, IIT Bombay · © 2026
      </footer>

    </div>
  )
}

export default Home