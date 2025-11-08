import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart2, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../App';
import Logo from '../ui/Logo';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/dashboard/products', icon: Package, label: 'Products' },
    { to: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/dashboard/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  type NavItemProps = {
    to: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
  };

  const NavItem = ({ to, icon: Icon, label }: NavItemProps) => (
    <NavLink
      to={to}
      end={to === '/dashboard'}
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
          isActive && 'bg-muted text-primary'
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );

  return (
    <div className="hidden border-r border-border bg-card lg:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link to="/dashboard" className="font-semibold text-foreground">
            <Logo textClassName="!text-foreground" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/40?u=${user?.email}`} alt="User" className="h-10 w-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>
                <button onClick={logout} className="text-muted-foreground hover:text-primary">
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
