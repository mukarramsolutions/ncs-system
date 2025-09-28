import React, { useState } from 'react';
import { Download, Calendar, FileText, BarChart3 } from 'lucide-react';
import Modal from './Modal';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState('comprehensive');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [format, setFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);

  const handleGenerate = () => {
    // Handle report generation logic here
    console.log('Generating report:', { reportType, dateRange, format, includeCharts });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report" size="lg">
      <div className="space-y-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                reportType === 'comprehensive' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setReportType('comprehensive')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Comprehensive Report</h4>
                  <p className="text-sm text-gray-600">All modules and analytics</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                reportType === 'revenue' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setReportType('revenue')}
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Revenue Report</h4>
                  <p className="text-sm text-gray-600">Financial performance only</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                reportType === 'operations' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setReportType('operations')}
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Operations Report</h4>
                  <p className="text-sm text-gray-600">Parcels and deliveries</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                reportType === 'staff' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setReportType('staff')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Staff Performance</h4>
                  <p className="text-sm text-gray-600">Employee metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="last-year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="pdf"
                checked={format === 'pdf'}
                onChange={(e) => setFormat(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">PDF</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="excel"
                checked={format === 'excel'}
                onChange={(e) => setFormat(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Excel</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="csv"
                checked={format === 'csv'}
                onChange={(e) => setFormat(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">CSV</span>
            </label>
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Include charts and graphs</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateReportModal;