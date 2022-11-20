import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "applictacion/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Failed to authenticate user");
      })
      .then((responseJson) => {
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div className="mx-8 my-10">Good bye!</div>;
}
