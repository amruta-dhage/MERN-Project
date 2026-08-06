import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <>
      {/* <nav className="p-3 bg-sky-500 text-white  text-shadow-md font-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-1">
        <h2 className="col-span-3 mt-1">Note Tracker</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2">
          <div className="">
            <button className=" hover:bg-sky-700 rounded-md p-2" onClick={() => { navigate("/dashboard") }}>
              Dashboard
            </button>
          </div>
          <div>
            <button to={""} className=" hover:bg-sky-700 rounded-md p-2 " onClick={() => setIsOpen(true)}>
              Add Note
            </button>
          </div>
          <div>
            {" "}
            <button className=" hover:bg-sky-700 rounded-md p-2" onClick={() => { navigate("/profile") }}>
              Profile
            </button>
          </div>
          <div>
            <button className=" hover:bg-sky-700 rounded-md p-2" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav> */}
      <nav className="bg-slate-950 text-white  shadow-md hover:bg-slate">
        <div className="max-w-7xl mx-auto px-4 font-bold py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <h2 className="text-2xl  text-center md:text-left">
            Note Tracker
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">


            <input type="text" placeholder="Search here" />




            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <LogoutIcon />   Logout
            </button>
          </div>
        </div>
      </nav>
    </>

  );
};

export default Navbar;
