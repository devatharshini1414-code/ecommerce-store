import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await loginUser({
        email,
        password,
      });

      // store token properly
      localStorage.setItem("token", data.token);
localStorage.setItem(
  "userInfo",
  JSON.stringify({
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role
  })
);
      toast.success("Login Successful");

      // redirect to home
      navigate("/");
    } catch (err) {
      toast.error(
  err.response?.data?.message ||
  "Invalid Credentials"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            width: "100%",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;