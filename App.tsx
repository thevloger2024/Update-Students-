/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { Toaster } from 'sonner';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));
const DetailPage = lazy(() => import('./pages/DetailPage').then(module => ({ default: module.DetailPage })));
const SavedPage = lazy(() => import('./pages/SavedPage').then(module => ({ default: module.SavedPage })));
const NotificationSettingsPage = lazy(() => import('./pages/NotificationSettingsPage').then(module => ({ default: module.NotificationSettingsPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));
const AdminFeaturesPage = lazy(() => import('./pages/AdminFeaturesPage').then(module => ({ default: module.AdminFeaturesPage })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academic-blue"></div>
  </div>
);

export default function App() {
  return (
    <BookmarkProvider>
      <Toaster position="top-center" richColors />
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/update/:id" element={<DetailPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/notifications" element={<NotificationSettingsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/features" element={<AdminFeaturesPage />} />
          </Routes>
        </Suspense>
      </Router>
    </BookmarkProvider>
  );
}

