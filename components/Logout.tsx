import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/auth/facebook/logout", {
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
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        window.open("/", "_self");
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>Good bye!</div>;
}
