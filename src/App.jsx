import { useState } from 'react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import ContributionGraph from './components/ContributionGraph'
import LanguageNetwork from './components/LanguageNetwork'
import DayDetailPanel from './components/DayDetailPanel'
import { useGitHubData } from './hooks/useGitHubData'

export default function App() {
  const [dark, setDark] = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)

  const username = import.meta.env.VITE_GITHUB_USERNAME || 'ahalya7259-lgtm'
  const { data, loading, error } = useGitHubData(username)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Header
          username={username}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          profile={data?.profile}
        />

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl p-4 text-sm">
              {error}
              <p className="mt-2 text-xs opacity-80">
                Make sure you set <code className="bg-black/10 px-1 rounded">VITE_GITHUB_TOKEN</code> and{' '}
                <code className="bg-black/10 px-1 rounded">VITE_GITHUB_USERNAME</code> in a <code>.env</code> file.
              </p>
            </div>
          )}

          {!loading && !error && data && (
            <>
              <StatsCards stats={data.stats} />

              <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Contribution Calendar</h2>
                <ContributionGraph
                  weeks={data.contributions}
                  onSelectDay={setSelectedDay}
                  selectedDay={selectedDay}
                />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Languages</h2>
                  <LanguageNetwork languages={data.languages} />
                </section>

                <DayDetailPanel day={selectedDay} username={username} />
              </div>
            </>
          )}
        </main>

        <footer className="text-center text-sm text-slate-500 py-8">
          GitHub Digital Twin · Built by Ahalya
        </footer>
      </div>
    </div>
  )
}
