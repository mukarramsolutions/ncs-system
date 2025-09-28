import React, { useState } from 'react';
import { Package, Search, Plus, Filter, Eye, Edit, Trash2, UserPlus, Printer } from 'lucide-react';
import ParcelModal from '../../components/modals/ParcelModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

interface ParcelListProps {
  onViewDetail: (id: string) => void;
}

const ParcelList: React.FC<ParcelListProps> = ({ onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showParcelModal, setShowParcelModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState<any>(null);

  // Mock parcel data
  const parcels = [
    {
      id: 'PKG001',
      trackingNumber: 'NCS2024001001',
      customer: 'John Doe',
      branch: 'Downtown',
      status: 'delivered',
      assignedStaff: 'Sarah Johnson',
      createdDate: '2024-01-15',
      destination: '123 Main St, City',
      weight: '2.5kg',
      charges: '$25.00'
    },
    {
      id: 'PKG002',
      trackingNumber: 'NCS2024001002',
      customer: 'Alice Brown',
      branch: 'Uptown',
      status: 'in-transit',
      assignedStaff: 'Mike Davis',
      createdDate: '2024-01-14',
      destination: '456 Oak Ave, Town',
      weight: '1.2kg',
      charges: '$18.00'
    },
    {
      id: 'PKG003',
      trackingNumber: 'NCS2024001003',
      customer: 'Bob Wilson',
      branch: 'Eastside',
      status: 'pending',
      assignedStaff: null,
      createdDate: '2024-01-13',
      destination: '789 Pine Rd, Village',
      weight: '3.8kg',
      charges: '$32.00'
    },
    {
      id: 'PKG004',
      trackingNumber: 'NCS2024001004',
      customer: 'Emma Davis',
      branch: 'Westend',
      status: 'processing',
      assignedStaff: 'John Smith',
      createdDate: '2024-01-12',
      destination: '321 Elm St, City',
      weight: '0.8kg',
      charges: '$12.00'
    },
    {
      id: 'PKG005',
      trackingNumber: 'NCS2024001005',
      customer: 'Tom Johnson',
      branch: 'Downtown',
      status: 'delivered',
      assignedStaff: 'Lisa Wilson',
      createdDate: '2024-01-11',
      destination: '654 Maple Dr, Town',
      weight: '4.2kg',
      charges: '$38.00'
    }
  ];

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

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddParcel = () => {
    setModalMode('add');
    setSelectedParcel(null);
    setShowParcelModal(true);
  };

  const handleEditParcel = (parcel: any) => {
    setModalMode('edit');
    setSelectedParcel(parcel);
    setShowParcelModal(true);
  };

  const handleViewParcel = (parcel: any) => {
    setModalMode('view');
    setSelectedParcel(parcel);
    setShowParcelModal(true);
  };

  const handleDeleteParcel = (parcel: any) => {
    setParcelToDelete(parcel);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting parcel:', parcelToDelete);
    setParcelToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parcels Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all parcels in the system</p>
        </div>
        <button 
          onClick={handleAddParcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Parcel</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by tracking number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Tracking Number</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Branch</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Assigned Staff</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Created Date</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{parcel.trackingNumber}</div>
                        <div className="text-sm text-gray-500">{parcel.weight} • {parcel.charges}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{parcel.customer}</div>
                    <div className="text-sm text-gray-500">{parcel.destination}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{parcel.branch}</td>
                  <td className="py-4 px-6">{getStatusBadge(parcel.status)}</td>
                  <td className="py-4 px-6">
                    {parcel.assignedStaff ? (
                      <span className="text-gray-900">{parcel.assignedStaff}</span>
                    ) : (
                      <span className="text-gray-500 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-900">{parcel.createdDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onViewDetail(parcel.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditParcel(parcel)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewParcel(parcel)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {!parcel.assignedStaff && (
                        <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors" title="Assign Staff">
                          <UserPlus className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors" title="Print Label">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors" title="Print Label">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteParcel(parcel)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParcels.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredParcels.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to {filteredParcels.length} of {filteredParcels.length} parcels
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Parcel Modal */}
      <ParcelModal
        isOpen={showParcelModal}
        onClose={() => setShowParcelModal(false)}
        mode={modalMode}
        parcel={selectedParcel}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Parcel"
        message={`Are you sure you want to delete parcel ${parcelToDelete?.trackingNumber}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default ParcelList;