import { head, propOr } from "ramda";
import connect from "@vkontakte/vk-connect";

export const getKeyAsync = keys => {
  connect.send("VKWebAppStorageGet", {
    keys: [keys]
  });
  return new Promise(resolve => {
    connect.subscribe(({ detail = {} }) => {
      if (detail.type === "VKWebAppStorageGetResult") {
        const value = propOr(null, "value")(head(detail.data.keys));
        resolve(value);
      }
    });
  });
};

export const setKeyAsync = (key, value) => {
  connect.send("VKWebAppStorageSet", {
    key,
    value: String(value)
  });
};
