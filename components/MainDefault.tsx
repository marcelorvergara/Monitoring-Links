import Link from "next/link";

export default function DefaultMain() {
  return (
    <main className="flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold">
        Welcome to{" "}
        <a className="text-blue-600" href="#">
          Monitoring Links
        </a>
      </h1>
      <div className="flex flex-wrap items-center justify-center mt-3 max-w-4xl ">
        <Link
          href="/howto"
          className="m-2 basis-2/3 p-2  text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in">
          <h3 className="text-md text-sm">Documentation &rarr;</h3>
          <p className="text-xs">
            Find information about how to use Monitoring Links.
          </p>
        </Link>
      </div>
    </main>
  );
}
