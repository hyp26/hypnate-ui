import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname.replace(/^\/dashboard\/?/, '');
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <h1 className="text-xl font-semibold text-foreground">{getTitle()}</h1>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px] h-9"
        />
      </div>
      <button className="relative rounded-full h-8 w-8 flex items-center justify-center hover:bg-muted">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary ring-1 ring-background"></span>
      </button>
    </header>
  );
};

export default Header;
