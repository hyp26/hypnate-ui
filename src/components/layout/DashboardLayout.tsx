import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
