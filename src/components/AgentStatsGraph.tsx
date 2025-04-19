'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AgentName } from '@/types/valorant';

interface AgentStatsGraphProps {
  agentPicks: Record<AgentName, number>;
  agentBans: Record<AgentName, number>;
  isMapPage?: boolean;
}

export function AgentStatsGraph({ agentPicks, agentBans, isMapPage = false }: AgentStatsGraphProps) {
  // Transform the data into the format needed for the chart
  const data = (Object.keys(agentPicks) as AgentName[]).map(agentName => ({
    name: agentName,
    picks: agentPicks[agentName],
    bans: agentBans[agentName] || 0
  }));

  // Calculate the maximum value for the Y-axis
  const maxPickValue = Math.max(...Object.values(agentPicks));
  const maxBanValue = Math.max(...Object.values(agentBans));
  const maxValue = Math.max(maxPickValue, maxBanValue);
  const yAxisMax = isMapPage ? Math.ceil(maxValue + 5) : 300;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Agent Pick and Ban Statistics</h2>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={[0, yAxisMax]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
              itemStyle={{ color: '#F3F4F6' }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="picks" name="Picks" fill="#00C3FF" />
            <Bar dataKey="bans" name="Bans" fill="#FF4655" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 