// components/AdminSidebar.tsx
import React from 'react';

const AdminSidebar: React.FC = () => {
  const navItems = ['Dashboard', 'Products', 'Categories','Orders', 'Logout'];

  return (
    <aside className="h-screen w-64 p-4 shadow-xl">
      {/* Logo / Title */}
      <div className="text-2xl font-semibold mb-6 pl-3">Shop Admin</div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <button
            key={item}
            className="text-left px-3 py-2 rounded-md text-md font-medium hover:bg-gray-200"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
