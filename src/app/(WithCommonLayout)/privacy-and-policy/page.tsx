import React from "react";

const PrivacyAndPolicyPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              This privacy policy outlines how we collect, use, and protect your
              personal information.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information you provide directly to us, such as when
              you create an account, use our services, or contact us for
              support.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect to provide, maintain, and
              improve our services, as well as to communicate with you and
              personalize your experience.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              3. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized or unlawful
              processing, accidental loss, destruction, or damage.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              4. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to access, correct, or delete your personal
              information. You may also have the right to restrict or object to
              certain processing of your data.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              5. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicyPage;
