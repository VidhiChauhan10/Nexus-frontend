import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectPage } from '@/pages/ProjectPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuthStore } from '@/store/authStore';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-strong)',
            borderRadius: '14px',
            fontSize: '13px',
            fontFamily: '"Space Grotesk", Inter, sans-serif',
            fontWeight: 500,
            boxShadow: 'var(--shadow-lg), var(--glow-sm)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: { primary: '#0df2c0', secondary: '#060914' },
            style: {
              borderLeft: '3px solid #0df2c0',
            },
          },
          error: {
            iconTheme: { primary: '#f43f5e', secondary: '#fff' },
            style: {
              borderLeft: '3px solid #f43f5e',
            },
          },
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"  element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />} />

        {/* Protected — App layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects"  element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/profile"   element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
