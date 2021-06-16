import {
  FieldFunctionOptions,
  FieldPolicy,
  InMemoryCache,
} from "@apollo/client";
import { AllShop } from "../codegen/AllShop";

// exisiting이 계속 undefined로 되는 이유..?
// 참고: https://github.com/apollographql/apollo-client/issues/6729
const seeCoffeeShopsFieldPolicy: FieldPolicy<AllShop[], AllShop[]> = {
  keyArgs: false,
  merge: (existing, incoming, _: FieldFunctionOptions) => {
    const safePrev = existing ? existing.slice(0) : [];
    const result = [...safePrev, ...incoming];
    return result;
  },
};

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Category: {
      keyFields: (obj) => `Category:${obj.slug}`,
    },
    Query: {
      fields: {
        seeCoffeeShops: seeCoffeeShopsFieldPolicy,
      },
    },
  },
});
