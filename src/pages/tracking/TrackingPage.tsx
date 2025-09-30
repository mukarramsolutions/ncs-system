import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, CheckCircle, Truck, Search } from 'lucide-react';

interface TrackingPageProps {
  trackingNumber?: string;
}

const TrackingPage: React.FC<TrackingPageProps> = ({ trackingNumber: initialTrackingNumber }) => {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data
  const mockTrackingData = {
    'NCS2024001001': {
      trackingNumber: 'NCS2024001001',
      status: 'delivered',
      customer: 'John Doe',
      destination: '123 Main St, Downtown, City 12345',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-17 11:45 AM',
      timeline: [
        {
          status: 'Package Created',
          location: 'Downtown Branch',
          timestamp: '2024-01-15 09:00 AM',
          description: 'Parcel received and processed',
          completed: true
        },
        {
          status: 'In Transit',
          location: 'Central Hub',
          timestamp: '2024-01-15 02:30 PM',
          description: 'Package sorted and dispatched',
          completed: true
        },
        {
          status: 'Out for Delivery',
          location: 'Downtown Area',
          timestamp: '2024-01-17 08:00 AM',
          description: 'Assigned to delivery driver',
          completed: true
        },
        {
          status: 'Delivered',
          location: '123 Main St, Downtown',
          timestamp: '2024-01-17 11:45 AM',
          description: 'Successfully delivered to recipient',
          completed: true
        }
      ]
    }
  };

  useEffect(() => {
    if (initialTrackingNumber) {
      handleTrack();
    }
  }, [initialTrackingNumber]);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = mockTrackingData[trackingNumber as keyof typeof mockTrackingData];
      if (data) {
        setTrackingData(data);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setTrackingData(null);
      }
    } catch (err) {
      setError('Failed to fetch tracking information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="w-5 h-5 text-gray-400" />;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'out for delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'in transit':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Parcel</h1>
          <p className="text-gray-600">Enter your tracking number to get real-time updates</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., NCS2024001001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Tracking: {trackingData.trackingNumber}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(trackingData.status)}`}>
                      {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium text-gray-900">{trackingData.customer}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Destination</p>
                  <p className="text-gray-900">{trackingData.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {trackingData.status === 'delivered' ? 'Delivered On' : 'Estimated Delivery'}
                  </p>
                  <p className="text-gray-900">
                    {trackingData.status === 'delivered' 
                      ? trackingData.actualDelivery 
                      : trackingData.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
              
              <div className="space-y-6">
                {trackingData.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {getStatusIcon(event.status, event.completed)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.status}
                        </h4>
                        <span className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 mb-2">
                        <MapPin className={`w-4 h-4 mr-1 ${event.completed ? 'text-gray-400' : 'text-gray-300'}`} />
                        <span className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.location}
                        </span>
                      </div>
                      <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 mb-4">
                If you have any questions about your shipment, please contact our customer service team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Phone: +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800">Email: support@ncs-logistics.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Tracking Numbers */}
        {!trackingData && !loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Try Demo Tracking Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setTrackingNumber('NCS2024001001');
                  setTimeout(() => handleTrack(), 100);
                }}
                className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">NCS2024001001</p>
                <p className="text-sm text-gray-600">Delivered Package</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;