import React, { useState } from 'react';
import { DollarSign, TrendingUp, Download, Calendar, Building2, Users } from 'lucide-react';
import { generateRevenueReport } from '../../utils/pdfGenerator';
import { generateRevenueExcel } from '../../utils/excelGenerator';

const RevenuesDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Mock revenue data
  const revenueStats = {
    total: 284750.00,
    monthly: 47458.33,
    growth: 15.2,
    byBranch: [
      { name: 'Downtown', revenue: 85425.00, percentage: 30 },
      { name: 'Uptown', revenue: 68340.00, percentage: 24 },
      { name: 'Eastside', revenue: 56950.00, percentage: 20 },
      { name: 'Westend', revenue: 45520.00, percentage: 16 },
      { name: 'Suburb', revenue: 28515.00, percentage: 10 },
    ],
    byStaff: [
      { name: 'Sarah Johnson', revenue: 34250.00, percentage: 28 },
      { name: 'Mike Davis', revenue: 28750.00, percentage: 24 },
      { name: 'John Smith', revenue: 25500.00, percentage: 21 },
      { name: 'Lisa Wilson', revenue: 20250.00, percentage: 17 },
      { name: 'Emma Rodriguez', revenue: 12500.00, percentage: 10 },
    ],
    monthlyTrend: [
      { month: 'Jan', revenue: 38500 },
      { month: 'Feb', revenue: 42300 },
      { month: 'Mar', revenue: 39800 },
      { month: 'Apr', revenue: 45200 },
      { month: 'May', revenue: 48900 },
      { month: 'Jun', revenue: 52100 },
      { month: 'Jul', revenue: 49700 },
      { month: 'Aug', revenue: 55300 },
      { month: 'Sep', revenue: 58200 },
      { month: 'Oct', revenue: 61400 },
      { month: 'Nov', revenue: 59800 },
      { month: 'Dec', revenue: 47458 }
    ]
  };

  const maxRevenue = Math.max(...revenueStats.byBranch.map(b => b.revenue));
  const maxMonthly = Math.max(...revenueStats.monthlyTrend.map(m => m.revenue));

  const handleExportPDF = () => {
    generateRevenueReport(revenueStats);
  };

  const handleExportExcel = () => {
    generateRevenueExcel(revenueStats);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Dashboard</h1>
          <p className="text-gray-600 mt-1">Track and analyze revenue performance across all operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>PDF Report</span>
          </button>
          <button 
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Excel Report</span>
          </button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${revenueStats.total.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">All time</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Average</p>
              <p className="text-2xl font-bold text-blue-600">${revenueStats.monthly.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Per month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-purple-600">+{revenueStats.growth}%</p>
              <p className="text-sm text-gray-500 mt-1">This period</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Top Branch</p>
              <p className="text-2xl font-bold text-orange-600">{revenueStats.byBranch[0].name}</p>
              <p className="text-sm text-gray-500 mt-1">${revenueStats.byBranch[0].revenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-3">
            {revenueStats.monthlyTrend.map((month, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 text-sm text-gray-600 font-medium">{month.month}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(month.revenue / maxMonthly) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-900 font-semibold text-right">
                  ${(month.revenue / 1000).toFixed(0)}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Branch */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Branch</h3>
          <div className="space-y-4">
            {revenueStats.byBranch.map((branch, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" style={{ 
                    backgroundColor: `hsl(${220 + index * 30}, 70%, 50%)` 
                  }} />
                  <span className="text-sm font-medium text-gray-700">{branch.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    ${(branch.revenue / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-gray-500">{branch.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Staff & Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Staff */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Staff</h3>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border border-gray-200 rounded-lg">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Staff Member</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Contribution</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {revenueStats.byStaff.map((staff, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-xs">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{staff.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-green-600">
                        ${staff.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{staff.percentage}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${staff.percentage * 3}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Reports</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Detailed Report</p>
                  <p className="text-sm text-gray-500">Complete revenue breakdown</p>
                </div>
              </div>
            </button>

            <button 
              onClick={handleExportPDF}
              className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Branch Summary</p>
                  <p className="text-sm text-gray-500">Revenue by branch</p>
                </div>
              </div>
            </button>

            <button 
              onClick={handleExportExcel}
              className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Staff Performance</p>
                  <p className="text-sm text-gray-500">Individual staff revenue</p>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Monthly Trends</p>
                  <p className="text-sm text-gray-500">Revenue over time</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Export formats available:</p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">PDF</span>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Excel</span>
              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">CSV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuesDashboard;