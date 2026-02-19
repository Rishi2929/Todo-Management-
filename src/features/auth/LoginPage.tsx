import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export const LoginPage = () => {
  const { loginAsync, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginAsync({
        ...data,
        remember: true,
      });

      toast.success("Login successful");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-xl border border-gray-200 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                    transition
                    ${errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                  placeholder="you@example.com"
                />
              </div>

              {errors.email && (
                <p id="email-error" className="mt-2 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register("password")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600
                    transition
                    ${errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your password"
                />
              </div>

              {errors.password && (
                <p id="password-error" className="mt-2 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />

              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
            </button>
          </form>
        </div>

        {/* Glass loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
