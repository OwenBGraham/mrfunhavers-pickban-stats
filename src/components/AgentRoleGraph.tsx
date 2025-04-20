import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AgentRole } from '@/types/valorant';
import { getAgentImage } from '@/services/agent/utils/agentUtils';

const AgentRoleGraph: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<AgentRole | null>(null);
  const [chartData, setChartData] = useState([
    { name: 'Agent 1', value: 50 },
    { name: 'Agent 2', value: 30 },
    { name: 'Agent 3', value: 20 },
    { name: 'Agent 4', value: 10 },
    { name: 'Agent 5', value: 5 },
  ]);

  const roles: AgentRole[] = ['Controller', 'Duelist', 'Initiator', 'Sentinel'];

  return (
    <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-0">Agent Role Distribution</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRole(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedRole === null
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Roles
          </button>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedRole === role
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 rounded-lg" />
        <div className="relative bg-white/10 p-3 sm:p-4 rounded-lg">
          <div className="relative h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ 
                  top: 10, 
                  right: 10, 
                  left: 20, 
                  bottom: 5 
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#9CA3AF"
                  width={0}
                  tick={{ 
                    fill: '#9CA3AF',
                    fontSize: 12,
                    width: 0
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                          <p className="text-white font-semibold">{label}</p>
                          <p className="text-gray-300">
                            {selectedRole ? 'Pick Rate' : 'Total Picks'}: {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {selectedRole && (
        <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {chartData.map((agent) => (
            <div
              key={agent.name}
              className="bg-white/10 p-3 rounded-lg flex items-center gap-3"
            >
              <div className="w-8 h-8 flex-shrink-0">
                <img
                  src={getAgentImage(agent.name)}
                  alt={agent.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <p className="text-white font-medium">{agent.name}</p>
                <p className="text-gray-400 text-sm">{agent.value.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentRoleGraph; 