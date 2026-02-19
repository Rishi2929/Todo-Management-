interface Props {
  role: "ADMIN" | "USER";
}

export const RoleBadge = ({ role }: Props) => {
  const base = "px-2 py-1 text-xs font-semibold rounded-full";

  const color = role === "ADMIN" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600";

  return <span className={`${base} ${color}`}>{role}</span>;
};
