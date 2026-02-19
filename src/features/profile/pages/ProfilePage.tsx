import { useProfile, useUpdateProfile, useChangePassword } from "../hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

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
    } catch (err: any) {
      toast.error("Password change failed");
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <h1 className="text-xl font-bold">Profile</h1>

      <div className="text-sm text-gray-600">Email: {data?.email}</div>

      {/* ------------------ UPDATE NAME ------------------ */}

      <form onSubmit={handleSubmit(onUpdate)} className="space-y-3">
        <input {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2">
          Update Name
        </button>
      </form>

      {/* ------------------ CHANGE PASSWORD ------------------ */}

      <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="space-y-3">
        <input type="password" placeholder="Current Password" {...registerPassword("currentPassword")} className="border p-2 w-full" />
        {passwordErrors.currentPassword && <p className="text-sm text-red-500">{passwordErrors.currentPassword.message}</p>}

        <input type="password" placeholder="New Password" {...registerPassword("newPassword")} className="border p-2 w-full" />
        {passwordErrors.newPassword && <p className="text-sm text-red-500">{passwordErrors.newPassword.message}</p>}

        <input type="password" placeholder="Confirm Password" {...registerPassword("confirmPassword")} className="border p-2 w-full" />
        {passwordErrors.confirmPassword && <p className="text-sm text-red-500">{passwordErrors.confirmPassword.message}</p>}

        <button type="submit" className="bg-gray-800 text-white px-4 py-2">
          Change Password
        </button>
      </form>
    </div>
  );
};
