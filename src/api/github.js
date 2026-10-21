const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
}

export async function fetchProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch profile (${res.status})`)
  return res.json()
}

export async function fetchRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  )
  if (!res.ok) throw new Error(`Failed to fetch repos (${res.status})`)
  return res.json()
}

/** Contribution calendar via GraphQL */
export async function fetchContributions(username) {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  })

  if (!res.ok) throw new Error(`GraphQL error (${res.status})`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error')

  return json.data.user.contributionsCollection.contributionCalendar
}

export async function fetchCommitsForDay(username, date) {
  // date is YYYY-MM-DD
  const since = `${date}T00:00:00Z`
  const until = `${date}T23:59:59Z`

  const res = await fetch(
    `https://api.github.com/search/commits?q=author:${username}+author-date:${date}&per_page=20`,
    {
      headers: {
        ...headers,
        Accept: 'application/vnd.github.cloak-preview+json',
      },
    }
  )

  if (!res.ok) return []
  const data = await res.json()
  return data.items || []
}

export async function fetchLanguageStats(repos) {
  const languageTotals = {}

  // Limit to first 30 repos to stay within rate limits
  const slice = repos.slice(0, 30)

  await Promise.all(
    slice.map(async (repo) => {
      try {
        const res = await fetch(repo.languages_url, { headers })
        if (!res.ok) return
        const langs = await res.json()
        Object.entries(langs).forEach(([lang, bytes]) => {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes
        })
      } catch {
        // ignore individual failures
      }
    })
  )

  return Object.entries(languageTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}
