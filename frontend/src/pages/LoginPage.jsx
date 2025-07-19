import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              {/* CHANGE: Replaced logo colors with neutral grays. */}
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-gray-700" />
              </div>
              {/* CHANGE: Styled typography to match our theme. */}
              <h1 className="text-2xl font-bold mt-2 text-gray-900 font-sans">Welcome Back</h1>
              <p className="text-gray-500 font-sans">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2 font-sans">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                {/* CHANGE: Completely restyled input. */}
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-gray-400
                             font-sans text-gray-800"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2 font-sans">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                {/* CHANGE: Completely restyled input. */}
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-gray-400
                             font-sans text-gray-800"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {/* CHANGE: Styled the show/hide password button. */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            {/* CHANGE: Replaced `btn` classes with a custom button style. */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg
                         font-semibold text-white bg-gray-800 hover:bg-gray-900 transition-colors
                         disabled:bg-gray-400"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            {/* CHANGE: Restyled the signup link. */}
            <p className="text-sm text-gray-600 font-sans">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-gray-800 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern (already styled) */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};
export default LoginPage;