import React, { useState } from 'react';
import { UserCheck, Search, Plus, Filter, Eye, Edit, Trash2, Package, DollarSign } from 'lucide-react';
import StaffModal from '../../components/modals/StaffModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

interface StaffListProps {
  onViewDetail: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({ onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<any>(null);

  // Mock staff data
  const staff = [
    {
      id: 'STAFF001',
      name: 'Sarah Johnson',
      role: 'Delivery Driver',
      branch: 'Downtown',
      parcelsAssigned: 45,
      revenueGenerated: 1125.00,
      email: 'sarah.johnson@ncs.com',
      phone: '+1 234-567-8901',
      joinDate: '2023-06-15',
      status: 'active'
    },
    {
      id: 'STAFF002',
      name: 'Mike Davis',
      role: 'Package Handler',
      branch: 'Uptown',
      parcelsAssigned: 32,
      revenueGenerated: 800.00,
      email: 'mike.davis@ncs.com',
      phone: '+1 234-567-8902',
      joinDate: '2023-08-22',
      status: 'active'
    },
    {
      id: 'STAFF003',
      name: 'Lisa Wilson',
      role: 'Branch Manager',
      branch: 'Eastside',
      parcelsAssigned: 0,
      revenueGenerated: 0,
      email: 'lisa.wilson@ncs.com',
      phone: '+1 234-567-8903',
      joinDate: '2023-03-10',
      status: 'active'
    },
    {
      id: 'STAFF004',
      name: 'John Smith',
      role: 'Delivery Driver',
      branch: 'Westend',
      parcelsAssigned: 38,
      revenueGenerated: 950.00,
      email: 'john.smith@ncs.com',
      phone: '+1 234-567-8904',
      joinDate: '2023-07-18',
      status: 'active'
    },
    {
      id: 'STAFF005',
      name: 'Emma Rodriguez',
      role: 'Customer Service',
      branch: 'Downtown',
      parcelsAssigned: 0,
      revenueGenerated: 0,
      email: 'emma.rodriguez@ncs.com',
      phone: '+1 234-567-8905',
      joinDate: '2023-11-05',
      status: 'inactive'
    }
  ];

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

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive</span>;
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleAddStaff = () => {
    setModalMode('add');
    setSelectedStaff(null);
    setShowStaffModal(true);
  };

  const handleEditStaff = (staff: any) => {
    setModalMode('edit');
    setSelectedStaff(staff);
    setShowStaffModal(true);
  };

  const handleViewStaff = (staff: any) => {
    setModalMode('view');
    setSelectedStaff(staff);
    setShowStaffModal(true);
  };

  const handleDeleteStaff = (staff: any) => {
    setStaffToDelete(staff);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting staff:', staffToDelete);
    setStaffToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage staff members and their performance</p>
        </div>
        <button 
          onClick={handleAddStaff}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Staff</span>
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
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="Delivery Driver">Delivery Driver</option>
              <option value="Package Handler">Package Handler</option>
              <option value="Branch Manager">Branch Manager</option>
              <option value="Customer Service">Customer Service</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Staff Member</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Branch</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Parcels Assigned</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Revenue Generated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getRoleBadge(member.role)}</td>
                  <td className="py-4 px-6 text-gray-900">{member.branch}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{member.parcelsAssigned}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-green-600">
                        ${member.revenueGenerated.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(member.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onViewDetail(member.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditStaff(member)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewStaff(member)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStaff(member)}
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

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredStaff.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to {filteredStaff.length} of {filteredStaff.length} staff members
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

      {/* Staff Modal */}
      <StaffModal
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
        mode={modalMode}
        staff={selectedStaff}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Staff Member"
        message={`Are you sure you want to delete staff member ${staffToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default StaffList;