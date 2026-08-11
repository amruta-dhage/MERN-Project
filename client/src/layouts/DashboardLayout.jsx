// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex">
//         <Sidebar />

//         <main className="flex-1 p-6 min-w-0">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Side */}
      <div className="md:ml-64">

        {/* Navbar */}
        <Navbar />

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-[#05091f] flex items-center px-4">

          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-2xl"
          >
            ☰
          </button>

          <h1 className="ml-4 text-xl font-bold text-white">
            NoteTracker
          </h1>

        </div>

        {/* Content */}
        <main className="pt-16 min-h-screen p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;