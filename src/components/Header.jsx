import { Moon, Sun, Github } from 'lucide-react'

export default function Header({ username, dark, onToggleDark, profile }) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Github className="h-6 w-6 text-emerald-500" />
          <div>
            <h1 className="font-bold text-lg leading-tight">GitHub Digital Twin</h1>
            <p className="text-xs text-slate-500">@{username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={username}
              className="h-8 w-8 rounded-full ring-2 ring-emerald-500/30"
            />
          )}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
