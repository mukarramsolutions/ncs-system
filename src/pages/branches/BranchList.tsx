import React, { useState } from 'react';
import { Building2, Search, Plus, Filter, Eye, CreditCard as Edit, Trash2, MapPin, Users, Package, DollarSign } from 'lucide-react';
import { generateBranchReport } from '../../utils/pdfGenerator';
import { generateBranchExcel } from '../../utils/excelGenerator';
import BranchModal from '../../components/modals/BranchModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

interface BranchListProps {
  onViewDetail: (id: string) => void;
}

const BranchList: React.FC<BranchListProps> = ({ onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<any>(null);

  // Mock branch data
  const branches = [
    {
      id: 'BRANCH001',
      name: 'Downtown Branch',
      location: '123 Main Street, Downtown, City 12345',
      manager: 'Lisa Wilson',
      staffCount: 12,
      totalParcels: 1250,
      monthlyRevenue: 31250.00,
      status: 'active',
      phone: '+1 234-567-9001',
      email: 'downtown@ncs.com',
      established: '2020-01-15'
    },
    {
      id: 'BRANCH002',
      name: 'Uptown Branch',
      location: '456 Oak Avenue, Uptown, City 12346',
      manager: 'Michael Chen',
      staffCount: 8,
      totalParcels: 980,
      monthlyRevenue: 24500.00,
      status: 'active',
      phone: '+1 234-567-9002',
      email: 'uptown@ncs.com',
      established: '2020-06-22'
    },
    {
      id: 'BRANCH003',
      name: 'Eastside Branch',
      location: '789 Pine Road, Eastside, City 12347',
      manager: 'Sarah Johnson',
      staffCount: 10,
      totalParcels: 1100,
      monthlyRevenue: 27500.00,
      status: 'active',
      phone: '+1 234-567-9003',
      email: 'eastside@ncs.com',
      established: '2020-09-10'
    },
    {
      id: 'BRANCH004',
      name: 'Westend Branch',
      location: '321 Elm Street, Westend, City 12348',
      manager: 'David Rodriguez',
      staffCount: 6,
      totalParcels: 750,
      monthlyRevenue: 18750.00,
      status: 'active',
      phone: '+1 234-567-9004',
      email: 'westend@ncs.com',
      established: '2021-03-18'
    },
    {
      id: 'BRANCH005',
      name: 'Suburb Branch',
      location: '654 Maple Drive, Suburb, City 12349',
      manager: 'Emma Davis',
      staffCount: 4,
      totalParcels: 420,
      monthlyRevenue: 10500.00,
      status: 'inactive',
      phone: '+1 234-567-9005',
      email: 'suburb@ncs.com',
      established: '2021-11-05'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive</span>;
  };

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBranch = () => {
    setModalMode('add');
    setSelectedBranch(null);
    setShowBranchModal(true);
  };

  const handleEditBranch = (branch: any) => {
    setModalMode('edit');
    setSelectedBranch(branch);
    setShowBranchModal(true);
  };

  const handleViewBranch = (branch: any) => {
    setModalMode('view');
    setSelectedBranch(branch);
    setShowBranchModal(true);
  };

  const handleDeleteBranch = (branch: any) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log('Deleting branch:', branchToDelete);
    setBranchToDelete(null);
  };

  const handleExportPDF = () => {
    generateBranchReport(filteredBranches);
  };

  const handleExportExcel = () => {
    generateBranchExcel(filteredBranches);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branches Management</h1>
          <p className="text-gray-600 mt-1">Manage branch locations and operations</p>
        </div>
        <button 
          onClick={handleAddBranch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Branch</span>
        </button>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Export PDF
          </button>
          <button 
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search branches..."
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

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div key={branch.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            {/* Branch Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-500">Est. {branch.established}</p>
                </div>
              </div>
              {getStatusBadge(branch.status)}
            </div>

            {/* Branch Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{branch.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Manager: {branch.manager}</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-lg font-semibold">{branch.staffCount}</span>
                </div>
                <p className="text-xs text-gray-500">Staff</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                  <Package className="w-4 h-4" />
                  <span className="text-lg font-semibold">{branch.totalParcels}</span>
                </div>
                <p className="text-xs text-gray-500">Parcels</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-lg font-semibold">
                    {(branch.monthlyRevenue / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => onViewDetail(branch.id)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleEditBranch(branch)}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleViewBranch(branch)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteBranch(branch)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Summary Stats */}
      {filteredBranches.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredBranches.length}</p>
              <p className="text-sm text-gray-600">Total Branches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredBranches.reduce((sum, b) => sum + b.staffCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filteredBranches.reduce((sum, b) => sum + b.totalParcels, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Parcels</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ${(filteredBranches.reduce((sum, b) => sum + b.monthlyRevenue, 0) / 1000).toFixed(0)}k
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      )}

      {/* Branch Modal */}
      <BranchModal
        isOpen={showBranchModal}
        onClose={() => setShowBranchModal(false)}
        mode={modalMode}
        branch={selectedBranch}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Branch"
        message={`Are you sure you want to delete branch ${branchToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default BranchList;