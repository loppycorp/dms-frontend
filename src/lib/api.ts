import * as querystring from "querystring";
import { signOut } from "next-auth/react";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:8081"
  }${path}`;
}

export function getApiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}${path}`;
}

export async function fetchAPIFromCMS(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  return fetchFromURL(getStrapiURL, path, urlParamsObject, mergedOptions);
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };
  return fetchFromURL(getApiURL, path, urlParamsObject, mergedOptions);
}

async function fetchFromURL(
  url: (path: string) => string,
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Build request URL
  const queryString = querystring.stringify(urlParamsObject);
  const requestUrl = `${url(`${path}${queryString ? `?${queryString}` : ""}`)}`;

  const data = await fetch(requestUrl, options);
  if (!data.ok) {
    // console.log(e);
  }

  return data.json();
}
