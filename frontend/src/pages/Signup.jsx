import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Wallet,
  User,
  Mail,
  Lock,
} from "lucide-react";

import toast from "react-hot-toast";

import API from "../services/api";
import { useAuth } from "../context/useAuth";
import PasswordInput from "../components/PasswordInput";
import SiteFooter from "../components/SiteFooter";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
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
        "/auth/signup",
        formData
      );

      const { token, user } =
        response.data;

      login(token, user);

      toast.success(
        "Account created successfully! 🎉"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create account"
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
          <h1>Create Account</h1>

          <p>
            Start taking control of
            your finances today.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>

            <div className="input-wrapper">
              <User
                size={18}
                className="input-icon"
              />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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

            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              icon={Lock}
            />
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>
      </div>

      <SiteFooter />
    </div>
  );
}

export default Signup;