import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";

function Login() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  async function login(data) {
    setError("");
    setIsSubmitting(true);

    try {
      await authService.login(data);
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin(userData));
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (error) {
      setError(error.message || "Login failed. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <Logo />
        <h1 className="mt-5 text-2xl font-bold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          New to MegaBlog?{" "}
          <Link to="/signup" className="font-semibold text-blue-700 underline">
            Create an account
          </Link>
        </p>
      </div>

      {error ? (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(login)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {formState.errors.email ? (
          <p className="text-sm text-red-700">{formState.errors.email.message}</p>
        ) : null}

        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {formState.errors.password ? (
          <p className="text-sm text-red-700">
            {formState.errors.password.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

export default Login;
