import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },

    {
      name: "Pinned",
      path: "/pinned",
      icon: <PushPinIcon />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <CategoryIcon />,
    },
    {
      name: "Archived",
      path: "/archived",
      icon: <ArchiveIcon />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <PersonIcon />,
    },
    {
      name: "Logout",
      path: "/",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-72px)] bg-slate-900 text-white shadow-xl">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h2 className="text-xl font-bold tracking-wide">
          📒 MENU
        </h2>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive
                ? "bg-indigo-600 text-white shadow-lg"
                : "hover:bg-slate-800 text-gray-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4 text-center text-xs text-gray-400">
        Note Tracker v1.0
      </div>
    </aside>
  );
}

export default Sidebar;