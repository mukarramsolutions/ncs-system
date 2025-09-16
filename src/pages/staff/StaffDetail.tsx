import React from 'react';
import { ArrowLeft, User, Mail, Phone, Building2, Package, DollarSign, Calendar, Edit, Trash2, Award } from 'lucide-react';

interface StaffDetailProps {
  id: string;
  onBack: () => void;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ id, onBack }) => {
  // Mock staff detail data
  const staff = {
    id: 'STAFF001',
    name: 'Sarah Johnson',
    role: 'Delivery Driver',
    branch: 'Downtown',
    email: 'sarah.johnson@ncs.com',
    phone: '+1 234-567-8901',
    joinDate: '2023-06-15',
    status: 'active',
    parcelsAssigned: 45,
    parcelsDelivered: 43,
    revenueGenerated: 1125.00,
    averageDeliveryTime: '2.5 days',
    performance: {
      deliveryRate: 95.6,
      customerRating: 4.8,
      onTimeDelivery: 92.3
    },
    recentParcels: [
      {
        id: 'PKG001',
        trackingNumber: 'NCS2024001001',
        customer: 'John Doe',
        status: 'delivered',
        deliveryDate: '2024-01-17'
      },
      {
        id: 'PKG008',
        trackingNumber: 'NCS2024001008',
        customer: 'Alice Brown',
        status: 'in-transit',
        deliveryDate: null
      },
      {
        id: 'PKG015',
        trackingNumber: 'NCS2024001015',
        customer: 'Bob Wilson',
        status: 'delivered',
        deliveryDate: '2024-01-16'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'delivered': 'bg-green-100 text-green-800',
      'in-transit': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Details</h1>
            <p className="text-gray-600 mt-1">{staff.name} - {staff.role}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit Staff</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Parcels Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{staff.parcelsDelivered}</p>
              <p className="text-xs text-gray-500">of {staff.parcelsAssigned} assigned</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Revenue Generated</p>
              <p className="text-2xl font-bold text-green-600">${staff.revenueGenerated.toFixed(2)}</p>
              <p className="text-xs text-gray-500">this month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivery Rate</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(staff.performance.deliveryRate)}`}>
                {staff.performance.deliveryRate}%
              </p>
              <p className="text-xs text-gray-500">success rate</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Customer Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{staff.performance.customerRating}</p>
              <p className="text-xs text-gray-500">out of 5.0</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{staff.name}</h3>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {staff.role}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{staff.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{staff.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Branch</p>
                <p className="text-gray-900">{staff.branch}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="text-gray-900">{staff.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Parcels & Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Delivery Success Rate</span>
                  <span className={`text-sm font-semibold ${getPerformanceColor(staff.performance.deliveryRate)}`}>
                    {staff.performance.deliveryRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${staff.performance.deliveryRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">On-Time Delivery</span>
                  <span className={`text-sm font-semibold ${getPerformanceColor(staff.performance.onTimeDelivery)}`}>
                    {staff.performance.onTimeDelivery}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${staff.performance.onTimeDelivery}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Customer Rating</span>
                  <span className="text-sm font-semibold text-yellow-600">
                    {staff.performance.customerRating}/5.0
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(staff.performance.customerRating / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Parcels */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Parcels</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border border-gray-200 rounded-lg">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Tracking Number</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Delivery Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staff.recentParcels.map((parcel) => (
                    <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Package className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{parcel.trackingNumber}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{parcel.customer}</td>
                      <td className="py-3 px-4">{getStatusBadge(parcel.status)}</td>
                      <td className="py-3 px-4 text-gray-900">
                        {parcel.deliveryDate || 'Pending'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;