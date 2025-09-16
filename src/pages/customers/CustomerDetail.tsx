import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Package, DollarSign, Calendar, Edit, Trash2 } from 'lucide-react';

interface CustomerDetailProps {
  id: string;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ id, onBack }) => {
  // Mock customer detail data
  const customer = {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    address: '123 Main St, Downtown, City 12345',
    joinDate: '2023-08-15',
    status: 'active',
    totalParcels: 15,
    totalRevenue: 375.00,
    averageParcelValue: 25.00,
    parcels: [
      {
        id: 'PKG001',
        trackingNumber: 'NCS2024001001',
        status: 'delivered',
        createdDate: '2024-01-15',
        charges: '$25.00'
      },
      {
        id: 'PKG007',
        trackingNumber: 'NCS2024001007',
        status: 'in-transit',
        createdDate: '2024-01-12',
        charges: '$32.00'
      },
      {
        id: 'PKG012',
        trackingNumber: 'NCS2024001012',
        status: 'delivered',
        createdDate: '2024-01-08',
        charges: '$18.00'
      },
      {
        id: 'PKG018',
        trackingNumber: 'NCS2024001018',
        status: 'processing',
        createdDate: '2024-01-05',
        charges: '$28.00'
      },
      {
        id: 'PKG022',
        trackingNumber: 'NCS2024001022',
        status: 'delivered',
        createdDate: '2024-01-02',
        charges: '$22.00'
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
            <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
            <p className="text-gray-600 mt-1">{customer.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit Customer</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Parcels</p>
              <p className="text-2xl font-bold text-gray-900">{customer.totalParcels}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${customer.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Value</p>
              <p className="text-2xl font-bold text-purple-600">${customer.averageParcelValue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Member Since</p>
              <p className="text-lg font-bold text-gray-900">{customer.joinDate}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{customer.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">{customer.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">{customer.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Parcels */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Charges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customer.parcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Package className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{parcel.trackingNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(parcel.status)}</td>
                    <td className="py-3 px-4 text-gray-900">{parcel.createdDate}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">{parcel.charges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Contribution Over Time</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Revenue chart would be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;