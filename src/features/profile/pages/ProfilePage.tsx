import { useProfile, useUpdateProfile, useChangePassword } from "../hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Mail, User, Lock, Loader2 } from "lucide-react";

/* ------------------ SCHEMAS ------------------ */

const nameSchema = z.object({
  name: z.string().min(2, "Minimum 2 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[0-9]/, "Must contain number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type NameForm = z.infer<typeof nameSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export const ProfilePage = () => {
  const { data, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();
  const passwordMutation = useChangePassword();

  /* ------------------ NAME FORM ------------------ */

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
  });

  useEffect(() => {
    if (data?.name) {
      reset({ name: data.name });
    }
  }, [data, reset]);

  const onUpdate = async (formData: NameForm) => {
    try {
      await updateMutation.mutateAsync(formData);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  /* ------------------ PASSWORD FORM ------------------ */

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordChange = async (formData: PasswordForm) => {
    try {
      await passwordMutation.mutateAsync(formData);
      toast.success("Password changed");
      resetPassword();
    } catch {
      toast.error("Password change failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profile Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information and security</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
              {data?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{data?.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="h-4 w-4" />
                {data?.email}
              </div>
            </div>
          </div>

          {/* Update Name */}
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  {...register("name")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition
                  ${errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                />
              </div>

              {errors.name && <p className="mt-2 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Name"}
            </button>
          </form>
        </div>

        {/* Password Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>

          <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="space-y-4">
            {/* Current */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  {...registerPassword("currentPassword")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition
                  ${passwordErrors.currentPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                />
              </div>
              {passwordErrors.currentPassword && <p className="mt-2 text-xs text-red-600">{passwordErrors.currentPassword.message}</p>}
            </div>

            {/* New */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  {...registerPassword("newPassword")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition
                  ${passwordErrors.newPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                />
              </div>
              {passwordErrors.newPassword && <p className="mt-2 text-xs text-red-600">{passwordErrors.newPassword.message}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  {...registerPassword("confirmPassword")}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition
                  ${passwordErrors.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}`}
                />
              </div>
              {passwordErrors.confirmPassword && <p className="mt-2 text-xs text-red-600">{passwordErrors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={passwordMutation.isPending}
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition
              hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {passwordMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
