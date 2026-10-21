import { GitCommit, Star, GitFork, Users, FolderGit2 } from 'lucide-react'

const cards = [
  { key: 'totalContributions', label: 'Contributions', icon: GitCommit, color: 'bg-emerald-500' },
  { key: 'publicRepos', label: 'Public Repos', icon: FolderGit2, color: 'bg-blue-500' },
  { key: 'totalStars', label: 'Total Stars', icon: Star, color: 'bg-amber-500' },
  { key: 'totalForks', label: 'Total Forks', icon: GitFork, color: 'bg-purple-500' },
  { key: 'followers', label: 'Followers', icon: Users, color: 'bg-rose-500' },
]

export default function StatsCards({ stats }) {
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">{card.label}</p>
              <p className="text-2xl font-bold mt-1">{stats[card.key]?.toLocaleString() ?? '—'}</p>
            </div>
            <div className={`${card.color} p-2.5 rounded-lg text-white`}>
              <card.icon className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
