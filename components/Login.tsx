import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <main className="text-xs mt-4">
      <div className="mx-auto w-full md:w-11/12 md:px-8 px-6">
        <table className="table w-full">
          <thead>
            <tr className="flex-1 text-center text-lg">
              <th className="align-top">Login</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-start justify-center mt-3">
                <div className="w-52">
                  <Link
                    onClick={() => setIsLoading(true)}
                    href={process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/google"}
                    className="flex items-center justify-start w-full h-12 pr-2 py-1 mt-1 space-x-3 text-sm text-center bg-[#4285F4] border border-gray-300 rounded-sm hover:shadow-md transition-transform duration-200 transform hover:-translate-y-0.5">
                    <img
                      src="/static/images/btn_google.svg"
                      alt="Google logo"
                    />
                    <span className="text-white">Sign in with Google</span>
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-2">
                <div className="w-52">
                  <Link
                    onClick={() => setIsLoading(true)}
                    href={
                      process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook"
                    }
                    className="flex items-center justify-start w-full h-12 p-0.5 mt-1 space-x-3 text-sm text-center  bg-white border border-[#1877F2] rounded-sm hover:shadow-md transition-transform duration-200 transform hover:-translate-y-0.5">
                    <img
                      src="/static/images/btn_facebook.svg"
                      alt="Google logo"
                      width={38}
                    />
                    <span className="text-[#1877F2]">Login with Facebook</span>
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-4">
                <div className="w-full sm:w-4/12">
                  Upon logging in, we store your name, profile picture link and
                  user ID in our database solely for the purpose of this
                  application.
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-2">
                <div className="w-full sm:w-4/12">
                  Your information will not be shared or used for any other
                  purposes.
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-2">
                <div className="w-full sm:w-4/12">
                  <Link href="/privacypolicy" target="_blank">
                    <span className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isLoading ? (
        <div className="flex-none w-full">
          <div>
            <div className="flex w-full items-center justify-center">
              <div className="w-16 h-16 mt-12 border-4 border-dashed border-slate-600 rounded-full animate-spin dark:border-blue-700"></div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
