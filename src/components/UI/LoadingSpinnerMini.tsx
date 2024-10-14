const LoadingSpinnerMini = () => {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 py-2">
      <div className="flex justify-center items-center">
        <div className="w-4 h-4 border-2 border-gray-900 dark:border-gray-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinnerMini;
