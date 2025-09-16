import React from 'react';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Users, Package, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';

interface BranchDetailProps {
  id: string;
  onBack: () => void;
}

const BranchDetail: React.FC<BranchDetailProps> = ({ id, onBack }) => {
  // Mock branch detail data
  const branch = {
    id: 'BRANCH001',
    name: 'Downtown Branch',
    location: '123 Main Street, Downtown, City 12345',
    manager: 'Lisa Wilson',
    phone: '+1 234-567-9001',
    email: 'downtown@ncs.com',
    established: '2020-01-15',
    status: 'active',
    staffCount: 12,
    totalParcels: 1250,
    monthlyRevenue: 31250.00,
    averageDeliveryTime: '2.3 days',
    staff: [
      {
        id: 'STAFF001',
        name: 'Sarah Johnson',
        role: 'Delivery Driver',
        parcelsHandled: 45,
        revenue: 1125.00
      },
      {
        id: 'STAFF002',
        name: 'Mike Davis',
        role: 'Package Handler',
        parcelsHandled: 32,
        revenue: 800.00
      },
      {
        id: 'STAFF003',
        name: 'John Smith',
        role: 'Delivery Driver',
        parcelsHandled: 38,
        revenue: 950.00
      },
      {
        id: 'STAFF004',
        name: 'Emma Rodriguez',
        role: 'Customer Service',
        parcelsHandled: 0,
        revenue: 0
      }
    ],
    recentParcels: [
      {
        id: 'PKG001',
        trackingNumber: 'NCS2024001001',
        customer: 'John Doe',
        status: 'delivered',
        staff: 'Sarah Johnson',
        date: '2024-01-17'
      },
      {
        id: 'PKG008',
        trackingNumber: 'NCS2024001008',
        customer: 'Alice Brown',
        status: 'in-transit',
        staff: 'Mike Davis',
        date: '2024-01-16'
      },
      {
        id: 'PKG015',
        trackingNumber: 'NCS2024001015',
        customer: 'Bob Wilson',
        status: 'processing',
        staff: 'John Smith',
        date: '2024-01-15'
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

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      'Delivery Driver': 'bg-blue-100 text-blue-800',
      'Package Handler': 'bg-green-100 text-green-800',
      'Branch Manager': 'bg-purple-100 text-purple-800',
      'Customer Service': 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleStyles[role as keyof typeof roleStyles] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
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
            <h1 className="text-2xl font-bold text-gray-900">Branch Details</h1>
            <p className="text-gray-600 mt-1">{branch.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit Branch</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Branch Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Staff Members</p>
              <p className="text-2xl font-bold text-gray-900">{branch.staffCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Parcels</p>
              <p className="text-2xl font-bold text-gray-900">{branch.totalParcels}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-green-600">${branch.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-orange-600">{branch.averageDeliveryTime}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{branch.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                branch.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">{branch.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Manager</p>
                <p className="text-gray-900">{branch.manager}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{branch.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{branch.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Established</p>
                <p className="text-gray-900">{branch.established}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Staff & Recent Parcels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Staff Members */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Staff Members</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Staff
              </button>
            </div>

            <div className="space-y-3">
              {branch.staff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      {getRoleBadge(staff.role)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{staff.parcelsHandled} parcels</p>
                    <p className="text-sm text-green-600">${staff.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Parcels */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Parcels</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Parcels
              </button>
            </div>

            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border border-gray-200 rounded-lg">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Tracking Number</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Staff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {branch.recentParcels.map((parcel) => (
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
                      <td className="py-3 px-4 text-gray-900">{parcel.staff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Revenue Trend</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Revenue trend chart would be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;