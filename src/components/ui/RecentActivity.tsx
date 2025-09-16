import React from 'react';
import { Package, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      icon: CheckCircle,
      color: 'text-green-500',
      title: 'Parcel PKG001 delivered successfully',
      description: 'Delivered to John Doe at Downtown location',
      time: '5 minutes ago',
      location: 'Downtown Branch'
    },
    {
      id: 2,
      icon: Truck,
      color: 'text-blue-500',
      title: 'Parcel PKG002 out for delivery',
      description: 'Assigned to delivery staff Sarah Johnson',
      time: '15 minutes ago',
      location: 'Uptown Branch'
    },
    {
      id: 3,
      icon: Package,
      color: 'text-purple-500',
      title: 'New parcel received',
      description: 'PKG003 from Alice Brown, priority delivery',
      time: '32 minutes ago',
      location: 'Eastside Branch'
    },
    {
      id: 4,
      icon: MapPin,
      color: 'text-orange-500',
      title: 'Parcel PKG004 location updated',
      description: 'Currently at sorting facility',
      time: '1 hour ago',
      location: 'Central Hub'
    },
    {
      id: 5,
      icon: Clock,
      color: 'text-red-500',
      title: 'Delivery delayed',
      description: 'PKG005 delayed due to weather conditions',
      time: '2 hours ago',
      location: 'Westend Branch'
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        
        return (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center mt-2">
                <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{activity.location}</span>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="text-center pt-4">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View all activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;