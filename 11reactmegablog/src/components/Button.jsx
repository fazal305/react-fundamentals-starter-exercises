function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "border-blue-700 bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-600",
    secondary:
      "border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus:ring-blue-600",
    danger:
      "border-red-600 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
