const TermAndConditionPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Terms and Conditions
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Welcome to our recipe sharing community platform. By using our
              service, you agree to these terms and conditions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              1. User Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By submitting recipes, you grant us a non-exclusive license to
              use, reproduce, and share your content on our platform. You retain
              ownership of your recipes but are responsible for ensuring you
              have the right to share them.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              2. Community Guidelines
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Users must respect copyright laws, avoid offensive language, and
              refrain from sharing harmful or inappropriate content. We reserve
              the right to remove content that violates these guidelines.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              3. Privacy and Data Usage
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect and use personal data as outlined in our Privacy
              Policy. By using our platform, you consent to our data practices.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The platform&apos;s content and features are protected by
              copyright and other intellectual property laws. Users may not
              reproduce or distribute our content without permission.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              5. Disclaimer of Warranty
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our platform is provided &quot;as is&quot; without warranties. We
              are not responsible for the accuracy of user-submitted recipes or
              any consequences from their use.
            </p>

            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermAndConditionPage;
