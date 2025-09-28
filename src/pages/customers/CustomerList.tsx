import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Eye, Edit, Trash2, Package } from 'lucide-react';
import CustomerModal from '../../components/modals/CustomerModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

interface CustomerListProps {
  onViewDetail: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);

  // Mock customer data
  const customers = [
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, Downtown, City 12345',
      parcelsCount: 15,
      totalRevenue: '$375.00',
      joinDate: '2023-08-15',
      status: 'active'
    },
    {
      id: 'CUST002',
      name: 'Alice Brown',
      email: 'alice.brown@email.com',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, Uptown, City 12346',
      parcelsCount: 8,
      totalRevenue: '$200.00',
      joinDate: '2023-10-22',
      status: 'active'
    },
    {
      id: 'CUST003',
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      phone: '+1 234-567-8902',
      address: '789 Pine Rd, Eastside, City 12347',
      parcelsCount: 23,
      totalRevenue: '$575.00',
      joinDate: '2023-06-10',
      status: 'active'
    },
    {
      id: 'CUST004',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+1 234-567-8903',
      address: '321 Elm St, Westend, City 12348',
      parcelsCount: 3,
      totalRevenue: '$75.00',
      joinDate: '2024-01-05',
      status: 'inactive'
    },
    {
      id: 'CUST005',
      name: 'Tom Johnson',
      email: 'tom.johnson@email.com',
      phone: '+1 234-567-8904',
      address: '654 Maple Dr, Suburb, City 12349',
      parcelsCount: 31,
      totalRevenue: '$775.00',
      joinDate: '2023-04-18',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive</span>;
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    setModalMode('add');
    setSelectedCustomer(null);
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer: any) => {
    setModalMode('edit');
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleViewCustomer = (customer: any) => {
    setModalMode('view');
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleDeleteCustomer = (customer: any) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting customer:', customerToDelete);
    setCustomerToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
          <p className="text-gray-600 mt-1">Manage customer information and relationships</p>
        </div>
        <button 
          onClick={handleAddCustomer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
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
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Address</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Parcels Count</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">Member since {customer.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{customer.address}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{customer.parcelsCount}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-green-600">{customer.totalRevenue}</span>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(customer.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onViewDetail(customer.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditCustomer(customer)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewCustomer(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCustomer(customer)}
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to {filteredCustomers.length} of {filteredCustomers.length} customers
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

      {/* Customer Modal */}
      <CustomerModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        mode={modalMode}
        customer={selectedCustomer}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete customer ${customerToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default CustomerList;