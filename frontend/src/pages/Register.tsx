function Login() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-300 mb-8">
          Create Account for Smart Leads Dashboard
        </p>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <button
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;