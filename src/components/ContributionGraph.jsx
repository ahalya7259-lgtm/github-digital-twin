export default function ContributionGraph({ weeks = [], onSelectDay, selectedDay }) {
  if (!weeks.length) {
    return <p className="text-sm text-slate-500">No contribution data available.</p>
  }

  // Flatten for color legend max
  const allCounts = weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount))
  const max = Math.max(...allCounts, 1)

  function level(count) {
    if (count === 0) return 0
    if (count <= max * 0.25) return 1
    if (count <= max * 0.5) return 2
    if (count <= max * 0.75) return 3
    return 4
  }

  const colors = [
    'bg-slate-200 dark:bg-slate-800',
    'bg-emerald-200 dark:bg-emerald-900',
    'bg-emerald-400 dark:bg-emerald-700',
    'bg-emerald-600 dark:bg-emerald-500',
    'bg-emerald-800 dark:bg-emerald-300',
  ]

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day) => {
              const isSelected = selectedDay?.date === day.date
              return (
                <button
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  onClick={() => onSelectDay(day)}
                  className={`w-3 h-3 rounded-sm transition hover:ring-2 hover:ring-emerald-400 ${
                    colors[level(day.contributionCount)]
                  } ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
