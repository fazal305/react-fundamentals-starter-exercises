function Loading({ message = "Loading..." }) {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <p className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
        {message}
      </p>
    </div>
  );
}

export default Loading;
