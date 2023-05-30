import axios from "axios";
import queryString from "querystring";
import { getApiURL } from "@/lib/api";

type PayloadType = {
  url: string;
  data?: {};
  rawData?: any | null;
  redirectIfAuthenticated?: boolean;
  reloadIfSuccess?: boolean;
  disableLoading?: boolean;
  options?: {};
};

const defaultPayload = {
  url: "",
  data: {},
  rawData: null,
  redirectIfAuthenticated: false,
  reloadIfSuccess: false,
  disableLoading: false,
  options: {},
};

const http = {
  links: {},

  post: async (payload: PayloadType = defaultPayload) => {
    return await http.execute(payload, "post");
  },
  put: async (payload: PayloadType = defaultPayload) => {
    return await http.execute(payload, "put");
  },
  get: async (payload: PayloadType = defaultPayload) => {
    //somehow, data is not accepted in get method, so we will just manually put it to the url
    if (payload.rawData) {
      payload.url += "?" + payload.rawData;
      payload.rawData = null;
    } else if (payload.data) {
      payload.url += "?" + queryString.stringify(payload.data);
      payload.data = {};
    }
    return await http.execute(payload, "get");
  },

  execute: async (payload: PayloadType, method: string) => {
    // if (!payload.disableLoading) {
    //   store.state.isLoading = true;
    // }
    let data = payload.rawData
      ? payload.rawData
      : queryString.stringify(payload.data);
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: getApiURL() + payload.url,
        data: data,
        ...payload.options,
      })
        .catch((e) => {
          // e.errorCode = e.response.data.message
          //   ? e.response.data.message[0]
          //   : e.response.data.error;
          // e.errorMessage = e.errorCode
          //   ? t("errors." + e.errorCode)
          //   : e.response.statusText;
          // if (!e.errorMessage) e.errorMessage = e.errorCode;
          // // There are times in which we need to redirect to home if logged in already
          // if (payload.redirectIfAuthenticated) {
          //   if (e.errorCode === "ALREADY_LOGIN") router.push("/");
          // } else if (e.errorCode === "NOT_LOGIN") location.reload();
          console.log(e);

          if (e.response.data.error) {
            e.errors = e.response.data.error.map((item: any) => {
              return item.message;
            });
          } else {
            e.errors = [e.response.data.message];
          }

          reject(e);

          throw e;
        })
        .then((response) => {
          resolve(response);
        })
        .finally(() => {
          // if (!payload.disableLoading) {
          //   store.state.isLoading = false;
          // }
        });
    });
  },
};

export default http;
