import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
  selectedId?: string | null;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage, selectedId }) => {
  const getPageTitle = (page: string) => {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      parcels: 'Parcels',
      customers: 'Customers',
      staff: 'Staff',
      branches: 'Branches',
      revenues: 'Revenues',
      users: 'Users',
      settings: 'Settings'
    };
    return titles[page] || page;
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Home className="w-4 h-4" />
      <ChevronRight className="w-4 h-4" />
      <span className={selectedId ? 'text-gray-500' : 'text-gray-900 font-medium'}>
        {getPageTitle(currentPage)}
      </span>
      {selectedId && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Details</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;