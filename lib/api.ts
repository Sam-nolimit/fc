const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token && {
        Authorization: `Bearer ${token}`,
      }),
      ...headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}
