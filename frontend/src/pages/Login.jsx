import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Wallet,
  Mail,
  Lock,
} from "lucide-react";

import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/useAuth";
import PasswordInput from "../components/PasswordInput";
import SiteFooter from "../components/SiteFooter";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      const { token, user } =
        response.data;

      login(token, user);

      toast.success(
        `Welcome back, ${user.name || "User"}! 👋`
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-shape shape-one" />
      <div className="auth-background-shape shape-two" />

      <div className="auth-card">
        <div className="auth-logo">
          <Wallet size={30} />
        </div>

        <div className="auth-heading">
          <h1>Welcome Back</h1>

          <p>
            Login to continue managing
            your finances.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail
                size={18}
                className="input-icon"
              />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-container">
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" Enter your password"
                icon={Lock}
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login to Dashboard"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?

          <Link to="/signup">
            Create Account
          </Link>
        </p>
      </div>

      <SiteFooter />
    </div>
  );
}

export default Login;