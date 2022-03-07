import { NextRouter } from "next/router";
import { hasLocalStorage } from "src/utils/isClient";
import isEmpty from "lodash.isempty";

export interface UserInfo {
  id: string;
  password: string;
}
export function setupCredential() {
  if (hasLocalStorage()) {
    localStorage.setItem("trustpair", "trustpair@test");
  }
}

export function signin(user: UserInfo): boolean {
  try {
    if (hasLocalStorage() && localStorage.getItem(user.id) === user.password) {
      localStorage.setItem("trustpair_current_user", user.id);
      localStorage.setItem("trustpair_current_user_info", JSON.stringify(user));
      return true;
    }
  } catch (e) {
    console.warn("error in signin: ", e);
  }

  return false;
}

export function auth(id: string): boolean {
  try {
    if (hasLocalStorage() && !isEmpty(id)) {
      const { password } = JSON.parse(
        localStorage.getItem("trustpair_current_user_info") || "{}"
      ) as UserInfo;
      return password === localStorage.getItem(id);
    }
  } catch (e) {
    console.warn("error in auth: ", e);
  }
  return false;
}

export const userIdFromLocalStorage = (): string => {
  if (hasLocalStorage()) {
    return localStorage.getItem("trustpair_current_user") || "";
  }
  return "";
};

export const userAvatarFromLocalStorage = (avatar?: string): string => {
  if (hasLocalStorage()) {
    if (avatar) {
      localStorage.setItem("trustpair_current_user_avatar", avatar);
    }
    return localStorage.getItem("trustpair_current_user_avatar") || "";
  }
  return "";
};

export const routing = (router: NextRouter, userId: string): void => {
  if (auth(userId)) {
    router.replace("/");
  } else {
    router.replace("/signin");
  }
};
