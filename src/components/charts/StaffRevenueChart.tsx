import React from 'react';

const StaffRevenueChart: React.FC = () => {
  // Mock data for staff revenues
  const staffData = [
    { name: 'John Smith', revenue: 15000, percentage: 35, color: 'bg-blue-500' },
    { name: 'Sarah Johnson', revenue: 12000, percentage: 28, color: 'bg-green-500' },
    { name: 'Mike Davis', revenue: 8000, percentage: 19, color: 'bg-yellow-500' },
    { name: 'Lisa Wilson', revenue: 7800, percentage: 18, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex items-center space-x-6">
      {/* Staff list */}
      <div className="flex-1 space-y-3">
        {staffData.map((staff, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${staff.color}`} />
              <span className="text-sm text-gray-700">{staff.name}</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ${(staff.revenue / 1000).toFixed(1)}k
            </div>
          </div>
        ))}
      </div>

      {/* Donut chart */}
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="20"
          />
          {/* Blue segment - 35% */}
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="20"
            strokeDasharray={`${2 * Math.PI * 40 * 0.35} ${2 * Math.PI * 40}`}
            strokeDashoffset="0"
            transform="rotate(-90 60 60)"
          />
          {/* Green segment - 28% */}
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#10b981"
            strokeWidth="20"
            strokeDasharray={`${2 * Math.PI * 40 * 0.28} ${2 * Math.PI * 40}`}
            strokeDashoffset={`-${2 * Math.PI * 40 * 0.35}`}
            transform="rotate(-90 60 60)"
          />
          {/* Yellow segment - 19% */}
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#eab308"
            strokeWidth="20"
            strokeDasharray={`${2 * Math.PI * 40 * 0.19} ${2 * Math.PI * 40}`}
            strokeDashoffset={`-${2 * Math.PI * 40 * (0.35 + 0.28)}`}
            transform="rotate(-90 60 60)"
          />
          {/* Purple segment - 18% */}
          <circle
            cx="60"
            cy="60"
            r="40"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="20"
            strokeDasharray={`${2 * Math.PI * 40 * 0.18} ${2 * Math.PI * 40}`}
            strokeDashoffset={`-${2 * Math.PI * 40 * (0.35 + 0.28 + 0.19)}`}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">$42.8k</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffRevenueChart;