import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Profile from "../pages/Profile";
import Notes from "../pages/Notes";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: <FileText size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-[#05091f]
          text-white
          flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">

          <div>
            <h1 className="text-2xl font-bold text-white">
              NoteTracker
            </h1>

            <p className="text-xs text-gray-400">
              Manage your notes
            </p>
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                font-medium
                transition
                ${isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
                `
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

        {/* User Section */}
        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                User
              </p>

              <p className="text-xs text-gray-400">
                Note Tracker
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;