import React from 'react';
import { useState } from 'react';
import { Package, Users, UserCheck, Building2, DollarSign, Truck, Clock, CheckCircle } from 'lucide-react';
import InfoCard from '../components/ui/InfoCard';
import RevenueChart from '../components/charts/RevenueChart';
import StaffRevenueChart from '../components/charts/StaffRevenueChart';
import RecentActivity from '../components/ui/RecentActivity';
import GenerateReportModal from '../components/modals/GenerateReportModal';

const Dashboard: React.FC = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  const infoCards = [
    { title: 'Total Parcels', value: '2,847', icon: Package, color: 'blue' },
    { title: 'Customers', value: '1,329', icon: Users, color: 'green' },
    { title: 'Staff Members', value: '45', icon: UserCheck, color: 'purple' },
    { title: 'Branches', value: '12', icon: Building2, color: 'orange' },
    { title: 'Total Revenue', value: '$284,750', icon: DollarSign, color: 'emerald' },
    { title: 'Total Users', value: '1,418', icon: Users, color: 'indigo' },
    { title: 'Deliveries', value: '2,103', icon: Truck, color: 'teal' },
    { title: 'Pending Parcels', value: '97', icon: Clock, color: 'red' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your logistics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infoCards.map((card, index) => (
          <InfoCard key={index} {...card} />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Branch Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Branch</h3>
          <RevenueChart />
        </div>

        {/* Revenue by Staff Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Staff</h3>
          <StaffRevenueChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <RecentActivity />
      </div>

      {/* Generate Report Modal */}
      <GenerateReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
};

export default Dashboard;