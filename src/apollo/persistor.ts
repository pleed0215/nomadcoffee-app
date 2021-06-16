import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { apolloCache } from "./cache";

export const persistor = new CachePersistor({
  cache: apolloCache,
  storage: new AsyncStorageWrapper(AsyncStorage),
  serialize: false,
});
