import { Link } from "react-router-dom";

import useAuthStore from "../store/authStore";

function Dashboard() {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">
            Smart Leads
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 px-5 py-3 rounded-2xl"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
            <h2 className="text-gray-300 mb-3">
              Total Leads
            </h2>

            <p className="text-5xl font-bold">
              120
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
            <h2 className="text-gray-300 mb-3">
              Qualified
            </h2>

            <p className="text-5xl font-bold text-green-400">
              48
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
            <h2 className="text-gray-300 mb-3">
              Lost
            </h2>

            <p className="text-5xl font-bold text-red-400">
              12
            </p>
          </div>
        </div>

        <Link
          to="/leads"
          className="inline-block bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition"
        >
          Manage Leads
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;