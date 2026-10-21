import { useState, useEffect } from 'react'
import { fetchCommitsForDay } from '../api/github'
import { GitCommit } from 'lucide-react'

export default function DayDetailPanel({ day, username }) {
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!day?.date) {
      setCommits([])
      return
    }

    let cancelled = false
    setLoading(true)

    fetchCommitsForDay(username, day.date)
      .then((items) => {
        if (!cancelled) setCommits(items)
      })
      .catch(() => {
        if (!cancelled) setCommits([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [day, username])

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[16rem]">
      <h2 className="text-lg font-semibold mb-4">Day Detail</h2>

      {!day && (
        <p className="text-sm text-slate-500">
          Click a day on the contribution graph to see commits.
        </p>
      )}

      {day && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{day.date}</p>
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              {day.contributionCount} contribution{day.contributionCount !== 1 ? 's' : ''}
            </span>
          </div>

          {loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500" />
            </div>
          )}

          {!loading && commits.length === 0 && (
            <p className="text-sm text-slate-500">No public commits found for this day.</p>
          )}

          {!loading && commits.length > 0 && (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {commits.map((c) => (
                <li
                  key={c.sha}
                  className="flex gap-3 text-sm border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0"
                >
                  <GitCommit className="h-4 w-4 mt-0.5 text-slate-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{c.commit?.message?.split('\n')[0]}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.repository?.full_name} · {c.sha?.slice(0, 7)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
