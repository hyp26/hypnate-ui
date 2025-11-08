import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Register';
import LandingPage from './pages/landingPage';
import AnalyticsPage from './pages/AnalyticsPage';

// ---------- Auth Context Types ----------
type AuthContextType = {
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (storeName: string, email: string, phone: string, password: string) => void;
};

// ---------- Auth Context ----------
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const login = (email: string, password: string) => {
    // In a real app, you'd call an API
    setUser({ email, name: 'Demo Seller' });
  };

  const signup = (storeName: string, email: string, phone: string, password: string) => {
    // In a real app, you'd call an API
    setUser({ email, name: storeName });
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = { user, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------- useAuth Hook (type-safe) ----------
function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ---------- Private Route ----------
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" replace />;
}

// ---------- App ----------
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public pages with Navbar and Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
export { useAuth };
