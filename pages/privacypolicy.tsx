import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Monitoring Links Privacy Policy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="flex flex-col items-center justify-center text-center mt-4 px-4">
        <header>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-600">
            Monitoring Links Privacy Policy
          </h1>
          <p className="mt-1 text-sm text-slate-800">
            Last updated: April 3, 2023
          </p>
        </header>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <p>
            This Privacy Policy outlines how Monitoring Links ("we", "us", or
            "our") collects, uses, maintains, and discloses personal information
            from users ("User", "you", or "your") of the Monitoring Links
            application ("App").
          </p>
          <p>
            By using our App, you agree to the collection and use of your
            personal information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <h2 className="text-md mb-2">Information Collection and Use</h2>
          <p>
            We collect personal information from users when they log in using
            their Google account, specifically the user's basic profile
            information. This information is necessary to provide and improve
            our App's features and services. We may use the information
            collected for the following purposes:
          </p>
          <ul className="list-disc ml-5">
            <li>To identify and authenticate users</li>
            <li>To personalize user experience</li>
            <li>To improve our App and customer service</li>
          </ul>
        </section>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <h2 className="text-md mb-2">Sharing Your Personal Information</h2>
          <p>
            We do not sell, trade, or rent users' personal information to third
            parties. We may share generic aggregated demographic information not
            linked to any personal information regarding visitors and users with
            our business partners and advertisers for the purposes outlined
            above.
          </p>
        </section>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <h2 className="text-md mb-2">Security</h2>
          <p>
            We are committed to ensuring that your information is secure. We
            have implemented suitable physical, electronic, and managerial
            procedures to safeguard and secure the information we collect in
            order to prevent unauthorized access or disclosure.
          </p>
        </section>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <h2 className="text-md mb-2">Changes to This Privacy Policy</h2>
          <p>
            We are committed to ensuring that your information is secure. We
            have implemented suitable physical, electronic, and managerial
            procedures to safeguard and secure the information we collect in
            order to prevent unauthorized access or disclosure.
          </p>
        </section>

        <section className="mt-4 p-2 border-2 border-gray-700 rounded text-left text-xs sm:w-11/12">
          <h2 className="text-md mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at me@monitoringlinks.com.
          </p>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
