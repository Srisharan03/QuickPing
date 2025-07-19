const AuthImagePattern = ({ title, subtitle }) => {
  return (
    // CHANGE: Replaced `bg-base-200` with `bg-gray-100` for a very light background.
    <div className="hidden lg:flex items-center justify-center bg-gray-100 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              // CHANGES: Replaced `bg-primary/10` with a subtle gray.
              // Removed the opinionated `animate-pulse` and replaced it with a very slow, subtle pulse animation class if desired,
              // or it can be removed entirely for a static look.
              className="aspect-square rounded-2xl bg-gray-200"
            />
          ))}
        </div>
        {/* CHANGES: Applied specific text colors and font styles. */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 font-sans">{title}</h2>
        <p className="text-gray-500 font-sans">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;