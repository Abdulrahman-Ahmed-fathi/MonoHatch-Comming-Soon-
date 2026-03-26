import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "mono123";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem("mono-hatch-authenticated", "true");
      navigate("/dashboard", { replace: true });
      return;
    }
    setError("invalid username or password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-french-rose/10 p-6">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#f3e9ea] bg-white p-8 shadow-card">
        <h1 className="text-center text-2xl font-semibold text-french-rose">Mono Hatch Dashboard Login</h1>
        <p className="mt-2 text-center text-sm text-ink-warm/70">
          Enter credentials to access the dashboard.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-ink-warm">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=""
            className="w-full rounded-xl border border-[#e8dfe4] px-4 py-2 text-sm outline-none focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
          />

          <label className="block text-sm font-medium text-ink-warm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="*****"
            className="w-full rounded-xl border border-[#e8dfe4] px-4 py-2 text-sm outline-none focus:border-french-rose/60 focus:ring-2 focus:ring-french-rose/20"
          />

          {error ? <p className="text-sm text-rose-500">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-french-rose px-4 py-2 text-sm font-semibold text-white hover:bg-french-rose-shade1 focus:outline-none focus:ring-2 focus:ring-french-rose focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
