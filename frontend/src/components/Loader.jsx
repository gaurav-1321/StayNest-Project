const Loader = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to</h1>
        <h2 className="text-6xl font-extrabold text-blue-400">StayNest</h2>

        <p className="mt-2 text-lg">
          Find your perfect stay 🏔️
        </p>

        <div className="mt-6 w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Loader;
