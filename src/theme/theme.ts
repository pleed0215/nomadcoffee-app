import { DefaultTheme } from "styled-components/native";

export const lightTheme: DefaultTheme = {
  color: {
    primary: "#6f4e37",
    secondary: "#efefef",
    border: "#964b00",
    link: "#0095f6",
    button: "white",
    like: "#ED4956",
  },
  background: {
    primary: "#fafafa",
    secondary: "#6f4e37",
    button: "#6f4e37",
    avatar: "#dbdbdb",
  },
};
export const darkTheme: DefaultTheme = {
  color: {
    primary: "#eee",
    secondary: "rgb(78,171,205)",
    border: "rgb(219,219,219)",
    link: "#0095f6",
    button: "white",
    like: "#ED4956",
  },
  background: {
    primary: "#333",
    secondary: "#454545",
    button: "#4795f6",
    avatar: "#dbdbdb",
  },
};
