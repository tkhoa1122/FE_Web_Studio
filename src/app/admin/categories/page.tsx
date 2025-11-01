'use client';

import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Tag, FolderOpen } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  studioCount: number;
  color: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories: Category[] = [
    {
      id: '1',
      name: 'Photography Studio',
      description: 'Professional photography studios with advanced lighting and equipment',
      studioCount: 5,
      color: 'blue',
      status: 'Active',
      createdDate: '2024-01-01',
    },
    {
      id: '2',
      name: 'Video Production',
      description: 'Studios equipped for video recording and production',
      studioCount: 3,
      color: 'red',
      status: 'Active',
      createdDate: '2024-01-15',
    },
    {
      id: '3',
      name: 'Live Streaming',
      description: 'Studios optimized for live streaming and online broadcasts',
      studioCount: 2,
      color: 'purple',
      status: 'Active',
      createdDate: '2024-02-01',
    },
    {
      id: '4',
      name: 'Podcast Recording',
      description: 'Sound-proofed studios for podcast and audio recording',
      studioCount: 2,
      color: 'green',
      status: 'Active',
      createdDate: '2024-02-15',
    },
    {
      id: '5',
      name: 'Workshop Space',
      description: 'Multi-purpose spaces for workshops and training sessions',
      studioCount: 1,
      color: 'orange',
      status: 'Inactive',
      createdDate: '2024-03-01',
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.status === 'Active').length,
    inactive: categories.filter(c => c.status === 'Inactive').length,
    totalStudios: categories.reduce((sum, c) => sum + c.studioCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">Organize studios by categories and types</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FolderOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inactive}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FolderOpen className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Studios</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudios}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    category.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {category.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Studios</p>
                  <p className="text-lg font-semibold text-gray-900">{category.studioCount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm text-gray-700">{category.createdDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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

      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
