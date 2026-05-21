import useAuthStore from "../store/authStore";

function Dashboard() {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Smart Leads Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-lg">
          <h2 className="text-xl mb-2">
            Total Leads
          </h2>

          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-lg">
          <h2 className="text-xl mb-2">
            Qualified Leads
          </h2>

          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-lg">
          <h2 className="text-xl mb-2">
            Lost Leads
          </h2>

          <p className="text-4xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;