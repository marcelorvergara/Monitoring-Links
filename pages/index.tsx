import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainDefault from "../components/MainDefault";
import MainUserArea from "../components/MainUserArea";

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

interface IIsLoggedInProps {
  isLoggedIn: ISession | undefined;
}

function Main(props: IIsLoggedInProps) {
  const { isLoggedIn } = props;
  console.log(isLoggedIn);
  if (isLoggedIn === undefined) {
    return <MainDefault />;
  }
  return <MainUserArea userInfo={isLoggedIn} />;
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
    <div className="flex min-h-screen flex-col items-center justify-center py-2 md:container md:mx-auto">
      <Head>
        <title>Monitoring Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header userInfo={userInfo} />
      <Main isLoggedIn={userInfo} />
      <Footer />
    </div>
  );
};

export default Home;
