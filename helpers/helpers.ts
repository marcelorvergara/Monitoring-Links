export async function getUrls(id: string): Promise<any> {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + `/urls/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
