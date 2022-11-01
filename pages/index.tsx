import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export interface Data {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

export interface Picture {
  data: Data;
}

export interface ISession {
  _id: string;
  id: string;
  name: string;
  picture: Picture;
}

const Home: NextPage = () => {
  const [userInfo, setUserInfo] = useState<ISession | undefined>();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "applictacion/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setUserInfo(responseJson.user);
      })
      .catch((error) => {
        setUserInfo(undefined);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Monitoring Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header userInfo={userInfo} />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="#">
            Monitoring Links
          </a>
        </h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
