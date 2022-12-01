import Router from "next/router";
// @ts-ignore
import Cookies from "js-cookie";

export const setToken = (data: {
  user: { id: number; username: string };
  jwt: string;
}) => {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    Router.reload();
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  Router.reload();
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

export const getIdFromLocalCookie = () => {
  return Cookies.get("id");
};

export const getTokeFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req: {
  headers: { cookie: string };
}) => {
  if (!req.headers.cookie || "") return undefined;

  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith("jwt="));

  if (!jwtCookie) return undefined;

  return jwtCookie.split("=")[1];
};

export const getIdFromServerCookie = (req: { headers: { cookie: string } }) => {
  if (!req.headers.cookie || "") return undefined;

  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));

  if (!idCookie) return undefined;

  return idCookie.split("=")[1];
};
