'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AgentStatsGraphProps {
  agentPicks: Record<string, number>;
  agentBans: Record<string, number>;
}

export const AgentStatsGraph = ({ agentPicks, agentBans }: AgentStatsGraphProps) => {
  // Transform the data into the format needed for the chart
  const data = Object.keys(agentPicks).map(agentName => ({
    name: agentName,
    picks: agentPicks[agentName],
    bans: agentBans[agentName] || 0,
  }));

  return (
    <div className="bg-white/5 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Agent Pick/Ban Statistics</h3>
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ 
                fill: '#9CA3AF',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
              }}
              interval={0}
            />
            <YAxis
              domain={[0, 300]}
              ticks={[0, 50, 100, 150, 200, 250, 300]}
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                color: '#F3F4F6',
              }}
            />
            <Legend 
              verticalAlign="top"
              layout="horizontal"
              wrapperStyle={{
                paddingBottom: '20px'
              }}
            />
            <Bar
              dataKey="picks"
              name="Picks"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="bans"
              name="Bans"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 