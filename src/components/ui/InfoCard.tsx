import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon, color }) => {
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; icon: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-600' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'text-emerald-600' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: 'text-indigo-600' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', icon: 'text-teal-600' },
      red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-600' },
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
          <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;