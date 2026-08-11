import { LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <header className="hidden md:flex fixed top-0 right-0 left-64 h-16 z-40 bg-[#05091f] items-center justify-between px-8">

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 text-gray-400">
          <Search size={20} />
          <span className="font-semibold">
            Search here
          </span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition "
      >
        <LogOut size={22} />
        Logout
      </button>

    </header>
  );
};

export default Navbar;
