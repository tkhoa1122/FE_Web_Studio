'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, DollarSign, Users, Star } from 'lucide-react';

interface Studio {
  id: string;
  name: string;
  location: string;
  capacity: number;
  pricePerHour: number;
  rating: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  amenities: string[];
}

export default function StudiosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const studios: Studio[] = [
    {
      id: '1',
      name: 'Studio A - Premium',
      location: 'Quận 1, TP.HCM',
      capacity: 20,
      pricePerHour: 500000,
      rating: 4.8,
      status: 'Active',
      amenities: ['Lighting Equipment', 'Green Screen', 'Audio System'],
    },
    {
      id: '2',
      name: 'Studio B - Standard',
      location: 'Quận 3, TP.HCM',
      capacity: 15,
      pricePerHour: 350000,
      rating: 4.5,
      status: 'Active',
      amenities: ['Basic Lighting', 'Backdrop'],
    },
    {
      id: '3',
      name: 'Studio C - Mini',
      location: 'Quận 7, TP.HCM',
      capacity: 10,
      pricePerHour: 250000,
      rating: 4.3,
      status: 'Maintenance',
      amenities: ['Natural Light', 'Basic Equipment'],
    },
    {
      id: '4',
      name: 'Studio D - Pro',
      location: 'Quận 2, TP.HCM',
      capacity: 30,
      pricePerHour: 800000,
      rating: 4.9,
      status: 'Active',
      amenities: ['Professional Lighting', 'Sound Proof', 'Makeup Room', 'Changing Room'],
    },
  ];

  const filteredStudios = studios.filter(studio =>
    studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    studio.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Studios Management</h1>
          <p className="text-gray-600 mt-1">Manage all studio spaces and their details</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Studio
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search studios by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Studios</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{studios.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Studios</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {studios.filter(s => s.status === 'Active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.6</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {studios.reduce((acc, s) => acc + s.capacity, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Studios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredStudios.map((studio) => (
          <div key={studio.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{studio.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{studio.location}</span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    studio.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : studio.status === 'Inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {studio.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="text-sm font-semibold text-gray-900">{studio.capacity} people</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price/Hour</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ₫{studio.pricePerHour.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-sm font-semibold text-gray-900">{studio.rating}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {studio.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudios.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Studios Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
