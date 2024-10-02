const DashboardOverview = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/10240250?v=4"
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Welcome back, <span className="capitalize">devsrsihab</span> !
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here’s a quick overview of your dashboard
            </p>
          </div>
        </div>
      </div>
      {/* Stats or Quick Links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Account Status
            </p>
            <p className="text-2xl capitalize font-bold text-green-500">
              Active
            </p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h3v10H3zm7-7h3v17h-3zM13 4h3v17h-3zM21 8h-3v13h3z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Facilities
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              5
            </p>
          </div>
          <div className="text-yellow-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h8M8 10h8M8 13h8M8 16h8"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Booked
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              8
            </p>
          </div>
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Users
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              3
            </p>
          </div>
          <div className="text-blue-500">
            <svg
              className="feather feather-users"
              fill="none"
              height={24}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
