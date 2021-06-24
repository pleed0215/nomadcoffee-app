import { useQuery } from "@apollo/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, ListRenderItem, FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { QUERY_SEE_CATEGORY } from "../../apollo/queries";
import { AllShop } from "../../codegen/AllShop";
import { SeeCategory, SeeCategoryVariables } from "../../codegen/SeeCategory";
import { CafeItem } from "../../components/CafeItem";
import { ScreenLayout } from "../../components/ScreenLayout";
import { LoggedInStackScreenParam } from "../../navigation/navs";

export const CategoryScreen: React.FC<LoggedInStackScreenParam<"Category">> = ({
  route,
  navigation,
}) => {
  const { slug } = route.params;
  const { data, loading, fetchMore, refetch } = useQuery<
    SeeCategory,
    SeeCategoryVariables
  >(QUERY_SEE_CATEGORY, { variables: { slug } });
  const [refreshing, setRefreshing] = useState(false);
  const onRefreshing = async () => {
    setRefreshing(true);
    await refetch({
      slug,
      lastId: 0,
    });
    setRefreshing(false);
  };
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${slug} - ${
        loading
          ? "로딩중"
          : data?.seeCategory?.totalShops
          ? `${data?.seeCategory?.totalShops}개 카페`
          : "카페 없음"
      }`,
      headerTitleStyle: {
        color: theme.color.secondary,
        fontFamily: "DoHyeon",
        fontSize: 20,
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: theme.background.secondary,
      },
    });
  }, [slug, data?.seeCategory]);

  useEffect(() => {
    refetch({
      slug,
      lastId: 0,
    });
  }, [slug]);

  const onEndReached = () => {
    if (data?.seeCategory) {
      const shopsLength = data?.seeCategory.shops?.length;

      if (shopsLength && shopsLength > 0 && data?.seeCategory.shops) {
        fetchMore({
          variables: {
            slug,
            lastId: data?.seeCategory.shops[shopsLength - 1]?.id,
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
      {data?.seeCategory?.shops && (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefreshing}
          onEndReachedThreshold={0.05}
          onEndReached={onEndReached}
          data={data.seeCategory.shops as AllShop[]}
          keyExtractor={(item: AllShop) => `Cafe:${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={renderCafe}
        />
      )}
    </ScreenLayout>
  );
};
