import {GOOGLE_ANDROID_KEY, GOOGLE_DEV_KEY, GOOGLE_IOS_KEY, DEVELOPMENT_MODE} from "@env";
import { Platform } from "react-native";

export const IS_DEVEL= DEVELOPMENT_MODE === "true";
export const AUTH_TOKEN_NAME = "nomadcoffee_token";
export const DARK_NAME = "nomadcoffee_dark";
export const SITE_TITLE = "NOMAD COFFEE";
export const GOOGLE_API = IS_DEVEL ? GOOGLE_DEV_KEY : Platform.OS === "android" ? GOOGLE_ANDROID_KEY : GOOGLE_IOS_KEY;