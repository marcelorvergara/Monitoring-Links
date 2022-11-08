export async function getUrlStatus(id: string): Promise<any> {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + `/urlStatus/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function getUserUrls(id: string) {
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

export function parseDate(date: string) {
  const newDate = new Date(date);
  return `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString()}`;
}

export async function deleteUrlHelper(id: number) {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + `/urls/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
