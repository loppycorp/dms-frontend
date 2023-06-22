"use server";
import { Session } from "next-auth";
import { getApiURL } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function simulate(
  session: Session | null,
  api_url: string,
  item_id?: number
) {
  const api = api_url.split("?")[0];
  const url = getApiURL() + api + "/" + item_id + "/head";

  console.log(url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });

  if (response.ok) {
    revalidateTag(api_url);
  }

  return await response.json();
}

export async function park(
  session: Session | null,
  api_url: string,
  item_id?: string
) {
  const api = api_url.split("?")[0];
  const url = getApiURL() + api + "/" + item_id + "/admin";
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });

  if (response.ok) {
    revalidateTag(api_url);
  }

  return await response.json();
}

export async function deleteItem(
  session: Session | null,
  api_url: string,
  item_id?: number
) {
  const api = api_url.split("?")[0];
  const url = getApiURL() + api + "/" + item_id;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });

  if (response.ok) {
    revalidateTag(api_url);
  }

  return await response.json();
}

export async function createItem(
  data: any,
  session: Session | null,
  api_url: string
) {
  const url = getApiURL() + api_url;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });
  if (response.ok) {
    revalidateTag(api_url);
  }
  return await response.json();
}

export async function updateItem(
  data: any,
  session: Session | null,
  api_url: string,
  item_id?: string
) {
  const url = getApiURL() + api_url.split("?")[0] + "/" + item_id;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });
  if (response.ok) {
    revalidateTag(api_url);
  }
  return await response.json();
}

export async function completeItem(
  session: Session | null,
  api_url: string,
  item_id?: number
) {
  const api = api_url.split("?")[0];
  const url = getApiURL() + api + "/" + item_id + "/complete";
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
    cache: "no-cache",
  });

  if (response.ok) {
    revalidateTag(api_url);
  }

  return await response.json();
}
