export async function setUrlMonitor(
  url: string,
  id: string,
  warning_th: string,
  danger_th: string
) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SRV}/urls`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({ url, user_id: id, warning_th, danger_th }),
  });
}

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

export async function geStatistics(id: string) {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + `/statistics/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function geStatisticsLastHour(id: string) {
  return fetch(
    process.env.NEXT_PUBLIC_BACKEND_SRV + `/statistics/lastDay/${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function updateUrlHelper(url: {
  user_id: string | undefined;
  url_id: number | undefined;
  warning_th: string;
  danger_th: string;
}) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_SRV}/urls`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "applictacion/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(url),
  });
}

export async function deleteUrlHelper(id: number): Promise<any> {
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

export function parseDate(date: string) {
  const newDate = new Date(date);
  return `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString()}`;
}
