import React from 'react';
import { ArrowLeft, Package, MapPin, Clock, User, DollarSign, Edit, Printer, Trash2, UserPlus } from 'lucide-react';

interface ParcelDetailProps {
  id: string;
  onBack: () => void;
}

const ParcelDetail: React.FC<ParcelDetailProps> = ({ id, onBack }) => {
  // Mock parcel detail data
  const parcel = {
    id: 'PKG001',
    trackingNumber: 'NCS2024001001',
    status: 'delivered',
    type: 'Standard',
    weight: '2.5kg',
    dimensions: '30x20x15 cm',
    charges: '$25.00',
    createdDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, Downtown, City 12345'
    },
    assignedStaff: {
      name: 'Sarah Johnson',
      role: 'Delivery Driver',
      phone: '+1 234-567-8901'
    },
    branch: 'Downtown',
    timeline: [
      {
        status: 'Package Created',
        location: 'Downtown Branch',
        timestamp: '2024-01-15 09:00 AM',
        description: 'Parcel received and processed'
      },
      {
        status: 'In Transit',
        location: 'Central Hub',
        timestamp: '2024-01-15 02:30 PM',
        description: 'Package sorted and dispatched'
      },
      {
        status: 'Out for Delivery',
        location: 'Downtown Area',
        timestamp: '2024-01-17 08:00 AM',
        description: 'Assigned to delivery driver Sarah Johnson'
      },
      {
        status: 'Delivered',
        location: '123 Main St, Downtown',
        timestamp: '2024-01-17 11:45 AM',
        description: 'Successfully delivered to recipient'
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
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
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
            <h1 className="text-2xl font-bold text-gray-900">Parcel Details</h1>
            <p className="text-gray-600 mt-1">{parcel.trackingNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
            <Printer className="w-4 h-4" />
            <span>Print Label</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Parcel Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parcel Information */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Parcel Information</h3>
              {getStatusBadge(parcel.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Tracking Number</label>
                  <p className="text-lg font-semibold text-gray-900">{parcel.trackingNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Type</label>
                  <p className="text-gray-900">{parcel.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Weight</label>
                  <p className="text-gray-900">{parcel.weight}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Dimensions</label>
                  <p className="text-gray-900">{parcel.dimensions}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Charges</label>
                  <p className="text-lg font-semibold text-green-600">{parcel.charges}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Branch</label>
                  <p className="text-gray-900">{parcel.branch}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
            
            <div className="space-y-6">
              {parcel.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === parcel.timeline.length - 1 ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {index === parcel.timeline.length - 1 ? (
                      <Package className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{event.status}</h4>
                      <span className="text-sm text-gray-500">{event.timestamp}</span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{event.location}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Staff Info */}
        <div className="space-y-6">
          {/* Customer Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
              <User className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-gray-900">{parcel.customer.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-900">{parcel.customer.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                <p className="text-gray-900">{parcel.customer.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-gray-900">{parcel.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Assigned Staff */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Assigned Staff</h3>
              {!parcel.assignedStaff && (
                <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" title="Assign Staff">
                  <UserPlus className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {parcel.assignedStaff ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <p className="text-gray-900">{parcel.assignedStaff.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                  <p className="text-gray-900">{parcel.assignedStaff.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="text-gray-900">{parcel.assignedStaff.phone}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No staff assigned</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Assign Staff Member
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Edit className="w-5 h-5 text-blue-600" />
                <span>Edit Parcel Details</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Printer className="w-5 h-5 text-orange-600" />
                <span>Print Shipping Label</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <UserPlus className="w-5 h-5 text-purple-600" />
                <span>Reassign Staff</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>Delete Parcel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetail;