import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = [
  '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
]

export default function LanguageNetwork({ languages = [] }) {
  if (!languages.length) {
    return <p className="text-sm text-slate-500">No language data available.</p>
  }

  const top = languages.slice(0, 8)
  const total = top.reduce((s, l) => s + l.value, 0)

  const data = top.map((l) => ({
    name: l.name,
    value: l.value,
    percent: ((l.value / total) * 100).toFixed(1),
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.percent}%`,
              name,
            ]}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
