import React from 'react';

const RevenueChart: React.FC = () => {
  // Mock data for branch revenues
  const branchData = [
    { name: 'Downtown', revenue: 45000 },
    { name: 'Uptown', revenue: 38000 },
    { name: 'Eastside', revenue: 32000 },
    { name: 'Westend', revenue: 28000 },
    { name: 'Suburb', revenue: 25000 },
  ];

  const maxRevenue = Math.max(...branchData.map(d => d.revenue));

  return (
    <div className="space-y-4">
      {branchData.map((branch, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-20 text-sm text-gray-600 font-medium">{branch.name}</div>
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(branch.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </div>
          <div className="w-16 text-sm text-gray-900 font-semibold text-right">
            ${(branch.revenue / 1000).toFixed(0)}k
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueChart;