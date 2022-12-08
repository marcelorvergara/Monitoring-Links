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
              <td className="flex items-start justify-center">
                <div className="w-full sm:w-4/12">
                  <Link
                    onClick={() => setIsLoading(true)}
                    href={
                      process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook"
                    }
                    className="flex items-center justify-center w-full h-12 px-4 py-2 mt-2 space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-facebook"
                      viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                    <span className="text-sm text-white dark:text-gray-200">
                      Facebook
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center">
                <div className="w-full sm:w-4/12">
                  <Link
                    onClick={() => setIsLoading(true)}
                    href={process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/google"}
                    className="flex items-center justify-center w-full h-12 px-4 py-2 mt-2 space-x-3 text-sm text-center  bg-red-400 transition-colors duration-200 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#e33829"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                    <span className="text-sm text-white dark:text-gray-200">
                      Google
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-4">
                <div className="w-full sm:w-4/12">
                  After login, your name, profile picture link and user id are
                  stored in our database only for this application use.
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex items-start justify-center mt-2">
                <div className="w-full sm:w-4/12">
                  Your information will not be shared or used for other purpose.
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
