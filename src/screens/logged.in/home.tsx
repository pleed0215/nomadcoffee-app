import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { QUERY_SHOPS } from "../../apollo/queries";
import { AllShop } from "../../codegen/AllShop";
import { AllShops, AllShopsVariables } from "../../codegen/AllShops";
import { CafeItem } from "../../components/CafeItem";
import { ScreenLayout } from "../../components/ScreenLayout";
import { LoggedInNavScreenParam } from "../../navigation/navs";

export const HomeScreen: React.FC<LoggedInNavScreenParam<"Home">> = () => {
  const { data, loading, fetchMore, refetch } =
    useQuery<AllShops, AllShopsVariables>(QUERY_SHOPS);
  const [refreshing, setRefreshing] = useState(false);
  const onRefreshing = () => {
    setRefreshing(true);
    refetch({
      lastId: 0,
    });
    setRefreshing(false);
  };

  const onEndReached = () => {
    if (data?.seeCoffeeShops) {
      const shopsLength = data?.seeCoffeeShops.length;

      if (shopsLength > 0) {
        fetchMore({
          variables: {
            lastId: data?.seeCoffeeShops[shopsLength - 1]?.id,
          },
        });
      }
    }
  };

  const renderCafe: ListRenderItem<AllShop> = ({ item }) => (
    <CafeItem shop={item} />
  );

  return (
    <ScreenLayout loading={loading}>
      {data?.seeCoffeeShops && (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefreshing}
          onEndReachedThreshold={0.05}
          onEndReached={onEndReached}
          data={data.seeCoffeeShops as AllShop[]}
          keyExtractor={(item: AllShop) => `Cafe:${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={renderCafe}
        />
      )}
    </ScreenLayout>
  );
};
