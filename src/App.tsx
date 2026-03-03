import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewsPage } from './pages/NewsPage';
import { LotsPage } from './pages/LotsPage';
import { DistrictsPage } from './pages/DistrictPage';
import { useAuthStore } from './stores/authStore';
import { Toast } from './components/Toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {isAuthenticated && (
            <Route
              path="/*"
              element={
                <div className="flex h-screen bg-gray-100">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/lots" element={<LotsPage />} />
                        <Route path="/districts" element={<DistrictsPage />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
          )}

          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;