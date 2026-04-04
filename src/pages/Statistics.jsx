// Statistics.jsx
// Page: Public workshop statistics with filtering, sorting, and chart visualization
// Features: Filter by workshop/state/sort, inline bar charts, responsive table + mobile cards

import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock workshop data - in production this would come from the Django API
const mockData = [
  { id: 1, coordinator: 'Amit Sharma', institute: 'VIT Mumbai', instructor: 'Dr. Rajesh Kumar', workshop: 'Python', date: '2024-01-15', state: 'Maharashtra' },
  { id: 2, coordinator: 'Priya Nair', institute: 'NIT Calicut', instructor: 'Prof. Suresh', workshop: 'Scilab', date: '2024-02-20', state: 'Kerala' },
  { id: 3, coordinator: 'Ravi Verma', institute: 'IIT Delhi', instructor: 'Dr. Meena', workshop: 'OpenFOAM', date: '2024-03-10', state: 'Delhi' },
  { id: 4, coordinator: 'Sneha Patil', institute: 'COEP Pune', instructor: 'Prof. Kulkarni', workshop: 'Python', date: '2024-03-22', state: 'Maharashtra' },
  { id: 5, coordinator: 'Arjun Das', institute: 'Jadavpur University', instructor: 'Dr. Bose', workshop: 'LaTeX', date: '2024-04-05', state: 'West Bengal' },
]

// Available filter options for dropdowns
const workshopTypes = ['All', 'Python', 'Scilab', 'OpenFOAM', 'LaTeX', 'DWSIM']
const states = ['All', 'Maharashtra', 'Kerala', 'Delhi', 'West Bengal']

// Chart data - count of workshops per type and per state
const workshopCounts = ['Python', 'Scilab', 'OpenFOAM', 'LaTeX', 'DWSIM'].map(w => ({
  name: w,
  count: mockData.filter(d => d.workshop === w).length
}))

const stateCounts = ['Maharashtra', 'Kerala', 'Delhi', 'West Bengal'].map(s => ({
  name: s,
  count: mockData.filter(d => d.state === s).length
}))

// Highest count value used to calculate bar widths proportionally
const maxCount = Math.max(...workshopCounts.map(w => w.count))

function Statistics() {
  // Active filter state
  const [filters, setFilters] = useState({ workshop: 'All', state: 'All', sort: 'Newest' })

  // Which chart is currently shown ('state', 'workshop', or null)
  const [showChart, setShowChart] = useState(null)

  // Update a single filter key
  const handleFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }))

  // Apply filters and sort to mockData
  const filtered = mockData
    .filter(d => filters.workshop === 'All' || d.workshop === filters.workshop)
    .filter(d => filters.state === 'All' || d.state === filters.state)
    .sort((a, b) => filters.sort === 'Newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
    )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Navbar ── */}
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
          {/* Active page indicator on current nav link */}
          <Link to="/statistics" className="text-indigo-600 text-sm font-semibold border-b-2 border-indigo-600 pb-0.5" aria-current="page">
            Workshop Statistics
          </Link>
          <Link
            to="/login"
            className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sign in to your account"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto w-full px-4 py-8">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Workshop Statistics</h1>
          <p className="text-gray-500 text-sm mt-1">Browse and filter all workshops conducted across India</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Filters Sidebar ── sticky on desktop, full width on mobile */}
          <aside className="w-full lg:w-64 shrink-0" aria-label="Filter options">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-800">Filters</h2>
                {/* Clear all filters button */}
                <button
                  onClick={() => setFilters({ workshop: 'All', state: 'All', sort: 'Newest' })}
                  className="text-xs text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  aria-label="Clear all filters"
                >
                  Clear all
                </button>
              </div>

              {/* Workshop type filter */}
              <div className="mb-5">
                <label htmlFor="workshop-filter" className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Workshop
                </label>
                <select
                  id="workshop-filter"
                  value={filters.workshop}
                  onChange={e => handleFilter('workshop', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  aria-label="Filter by workshop type"
                >
                  {workshopTypes.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>

              {/* State filter */}
              <div className="mb-5">
                <label htmlFor="state-filter" className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  State
                </label>
                <select
                  id="state-filter"
                  value={filters.state}
                  onChange={e => handleFilter('state', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  aria-label="Filter by state"
                >
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Sort order */}
              <div className="mb-6">
                <label htmlFor="sort-filter" className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                  Sort By
                </label>
                <select
                  id="sort-filter"
                  value={filters.sort}
                  onChange={e => handleFilter('sort', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  aria-label="Sort workshops"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              {/* Chart toggle buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowChart(showChart === 'state' ? null : 'state')}
                  className="w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Toggle state-wise workshop chart"
                  aria-expanded={showChart === 'state'}
                >
                  📊 State Chart
                </button>
                <button
                  onClick={() => setShowChart(showChart === 'workshop' ? null : 'workshop')}
                  className="w-full py-2 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Toggle workshop-type chart"
                  aria-expanded={showChart === 'workshop'}
                >
                  📊 Workshop Chart
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main Content Area ── */}
          <div className="flex-1">

            {/* ── Inline Bar Chart Panel ── shown when a chart button is clicked */}
            {showChart && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6" role="region" aria-label={showChart === 'state' ? 'Workshops by state chart' : 'Workshops by type chart'}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-800">
                    {showChart === 'state' ? 'Workshops by State' : 'Workshops by Type'}
                  </h3>
                  {/* Close chart button */}
                  <button
                    onClick={() => setShowChart(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    aria-label="Close chart"
                  >
                    ×
                  </button>
                </div>

                {/* Horizontal bar chart - width proportional to count */}
                <div className="flex flex-col gap-3" role="list">
                  {(showChart === 'workshop' ? workshopCounts : stateCounts).map((item, i) => (
                    <div key={i} className="flex items-center gap-3" role="listitem">
                      <span className="text-sm text-gray-600 w-28 shrink-0">{item.name}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden" aria-label={`${item.count} workshops`}>
                        <div
                          className="h-full bg-indigo-500 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                          style={{ width: `${Math.max((item.count / maxCount) * 100, item.count > 0 ? 8 : 0)}%` }}
                        >
                          {item.count > 0 && (
                            <span className="text-white text-xs font-bold">{item.count}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results count + download */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500" aria-live="polite">
                {filtered.length} workshop{filtered.length !== 1 ? 's' : ''} found
              </p>
              <button
                className="text-sm text-indigo-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Download workshop data"
              >
                ⬇ Download
              </button>
            </div>

            {/* ── Workshop Table or Empty State ── */}
            {(filtered || []).length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                {/* Desktop Table - hidden on mobile */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm" role="table" aria-label="Workshop results">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['Sr No.', 'Coordinator', 'Institute', 'Instructor', 'Workshop', 'Date'].map(h => (
                          <th
                            key={h}
                            scope="col"
                            className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {(filtered || []).map((row, i) => (
                        <tr key={row.id} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">{row.coordinator}</td>
                          <td className="px-6 py-4 text-gray-600">{row.institute}</td>
                          <td className="px-6 py-4 text-gray-600">{row.instructor}</td>
                          <td className="px-6 py-4">
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
                              {row.workshop}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards - shown only on small screens */}
                <div className="md:hidden divide-y divide-gray-100" role="list" aria-label="Workshop list">
                  {(filtered || []).map((row) => (
                    <div key={row.id} className="p-4" role="listitem">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{row.coordinator}</span>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {row.workshop}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{row.institute}</p>
                      <p className="text-sm text-gray-500">{row.instructor}</p>
                      <p className="text-xs text-gray-400 mt-1">{row.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty state shown when no results match filters */
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center" role="status" aria-label="No results found">
                <div className="text-5xl mb-4" aria-hidden="true">📭</div>
                <h3 className="font-bold text-gray-700 text-lg mb-2">No workshops found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-xs mt-auto" role="contentinfo">
        Developed by FOSSEE group, IIT Bombay · © 2026
      </footer>
    </div>
  )
}

export default Statistics