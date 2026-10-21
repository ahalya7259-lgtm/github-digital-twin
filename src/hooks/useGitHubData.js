import { useState, useEffect } from 'react'
import {
  fetchProfile,
  fetchRepos,
  fetchContributions,
  fetchLanguageStats,
} from '../api/github'

export function useGitHubData(username) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [profile, repos, calendar] = await Promise.all([
          fetchProfile(username),
          fetchRepos(username),
          fetchContributions(username),
        ])

        const languages = await fetchLanguageStats(repos)

        // Simple stats derived from available data
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
        const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

        if (!cancelled) {
          setData({
            profile,
            contributions: calendar.weeks,
            languages,
            stats: {
              totalContributions: calendar.totalContributions,
              publicRepos: profile.public_repos,
              totalStars,
              totalForks,
              followers: profile.followers,
            },
          })
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load GitHub data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [username])

  return { data, loading, error }
}
