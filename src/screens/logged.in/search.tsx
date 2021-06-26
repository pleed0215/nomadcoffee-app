import React, { useLayoutEffect, useState, useEffect } from "react";

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native";
import { LoggedInStackScreenParam } from "../../navigation/navs";
import { Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { useLazyQuery } from "@apollo/client";
import { SearchUsers, SearchUsersVariables } from "../../codegen/SearchUsers";
import {
  QUERY_SEARCH_CATEGORY,
  QUERY_SEARCH_SHOPS,
  QUERY_SEARCH_USER,
} from "../../apollo/queries";
import { SearchShops, SearchShopsVariables } from "../../codegen/SearchShops";
import {
  SearchCategory,
  SearchCategoryVariables,
} from "../../codegen/SearchCategory";
import { useMe } from "../../hooks/useMe";
import { UserItem } from "../../components/search/UserItem";
import { ShopItem } from "../../components/search/ShopItem";
import { View } from "react-native";
import { CategoryItem } from "../../components/CategoryItem";

const width = Dimensions.get("window").width;

const TextInputWrapper = styled.View`
  position: relative;
  width: ${(width * 2) / 3}px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled(TextInput)`
  width: ${(width * 2) / 3}px;
  height: 34px;
  padding: 5px 10px 5px 30px;
  border: 1px solid ${(props) => props.theme.color.border};
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};
  font-size: 20px;
  font-family: "DoHyeon";
  border-radius: 5px;
`;

type SubmitEditingHandler = (
  e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
) => void;

type SearchBoxProp = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmitSearch: SubmitEditingHandler;
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${(props) => props.theme.background.primary};
`;

const SearchResultText = styled.Text`
  font-size: 24px;
  font-family: "DoHyeon";
  margin-bottom: 10px;
  color: ${(props) => props.theme.color.primary};
`;

const ResultText = styled.Text`
  font-size: 20px;
  font-family: "DoHyeon";
  margin-bottom: 5px;
  color: ${(props) => props.theme.color.primary};
`;

const ResultBox = styled.View`
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  max-height: 220px;
  min-height: 30px;
  padding: 10px;
`;

const ItemBox = styled.ScrollView`
  width: 100%;
  max-height: 190px;
`;

const ResultCount = styled.Text`
  font-size: 16px;
  font-family: "DoHyeon";
  color: ${(props) => props.theme.color.primary};
  margin-bottom: 5px;
`;

const SearchBox: React.FC<SearchBoxProp> = ({ setValue, onSubmitSearch }) => (
  <TextInputWrapper>
    <Ionicons
      name="search"
      size={20}
      style={{
        position: "absolute",
        left: 8,
        top: 8,
        color: "gray",
        zIndex: 20,
      }}
    />
    <SearchInput
      placeholder="Search"
      autoCapitalize="none"
      returnKeyType="search"
      keyboardType="default"
      autoCorrect={false}
      onChangeText={setValue}
      onSubmitEditing={onSubmitSearch}
    />
  </TextInputWrapper>
);

export const SearchScreen: React.FC<LoggedInStackScreenParam<"Search">> = ({
  navigation,
}) => {
  const [value, setValue] = useState("");
  const [term, setTerm] = useState("");
  let usersSearching = false;

  const theme = useTheme();
  const { data: me } = useMe();

  const onSubmitSearch: SubmitEditingHandler = (_) => {
    setTerm(value);
  };
  const [searchUsers, { data: usersSearch, loading: usersLoading, fetchMore }] =
    useLazyQuery<SearchUsers, SearchUsersVariables>(QUERY_SEARCH_USER, {
      onCompleted: () => {
        usersSearching = false;
      },
    });
  const [searchShops, { data: shopsSearch, loading: shopsLoading }] =
    useLazyQuery<SearchShops, SearchShopsVariables>(QUERY_SEARCH_SHOPS);
  const [
    searchCategories,
    { data: categoriesSearch, loading: categoriesLoading },
  ] = useLazyQuery<SearchCategory, SearchCategoryVariables>(
    QUERY_SEARCH_CATEGORY
  );
  type ScrollEventHandler = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => void;

  // 참고: https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end/53035034
  const onScrollUserItem: ScrollEventHandler = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
      if (!usersSearching && fetchMore && usersSearch?.searchUsers.results) {
        const usersLength = usersSearch.searchUsers.results.length;
        if (term.length > 1 && usersLength < usersSearch.searchUsers.total) {
          usersSearching = true;
          fetchMore({
            variables: {
              term,
              lastId: usersSearch?.searchUsers.results[usersLength - 1]?.id,
            },
          });
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerTitle: () => (
          <SearchBox setValue={setValue} onSubmitSearch={onSubmitSearch} />
        ),
        headerStyle: { backgroundColor: theme.background.secondary },
        headerLeft: () => <></>,
      });
    }
  }, [value]);

  useEffect(() => {
    if (term !== "") {
      if (term.length > 1) {
        searchUsers({ variables: { term } });
        searchCategories({ variables: { term } });
        searchShops({ variables: { term } });
      }
    }
  }, [term]);

  return (
    <Container>
      {term !== "" && (
        <>
          <SearchResultText>
            {(term.length > 1 && usersLoading) ||
            categoriesLoading ||
            shopsLoading
              ? `'${term}' 검색중 ...`
              : `'${term}' 검색 결과`}
            {term.length <= 1 && "두글자 이상으로 입력해주세요"}
          </SearchResultText>
          {!usersLoading && !categoriesLoading && !shopsLoading && (
            <>
              <ResultText>유저명 검색 결과</ResultText>
              <ResultBox>
                <ResultCount>
                  {usersSearch && usersSearch?.searchUsers.total === 0
                    ? "검색 결과 없음"
                    : `${usersSearch?.searchUsers.total}명 찾음`}
                </ResultCount>
                {usersSearch?.searchUsers &&
                  usersSearch?.searchUsers.total > 0 && (
                    <ItemBox
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled
                      onScroll={onScrollUserItem}
                      scrollEventThrottle={16}
                    >
                      {usersSearch?.searchUsers.results?.map((user, index) => (
                        <UserItem
                          key={`UserSearch:${user?.id}`}
                          navigation={navigation}
                          user={user!}
                          authId={me?.me?.id}
                          last={
                            usersSearch?.searchUsers?.results
                              ? usersSearch?.searchUsers?.results.length - 1 ===
                                index
                              : true
                          }
                        />
                      ))}
                    </ItemBox>
                  )}
              </ResultBox>
              <ResultText>카페 검색 결과</ResultText>
              <ResultBox>
                <ResultCount>
                  {shopsSearch?.searchShopsByTerm &&
                  shopsSearch?.searchShopsByTerm?.length === 0
                    ? "검색 결과 없음"
                    : `${shopsSearch?.searchShopsByTerm?.length}개 찾음`}
                </ResultCount>
                {shopsSearch?.searchShopsByTerm &&
                  shopsSearch.searchShopsByTerm.length > 0 && (
                    <ItemBox
                      contentContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {shopsSearch?.searchShopsByTerm?.map((shop) => (
                        <ShopItem
                          key={`Shop:${shop?.id}`}
                          shop={shop!}
                          navigation={navigation}
                        />
                      ))}
                    </ItemBox>
                  )}
              </ResultBox>
              <ResultText>카테고리 검색 결과</ResultText>
              <ResultBox>
                <ResultCount>
                  {categoriesSearch?.searchCategoriesByTerm &&
                  categoriesSearch?.searchCategoriesByTerm?.length === 0
                    ? "검색 결과 없음"
                    : `${categoriesSearch?.searchCategoriesByTerm?.length}개 찾음`}
                </ResultCount>
                {categoriesSearch?.searchCategoriesByTerm &&
                  categoriesSearch?.searchCategoriesByTerm?.length > 0 && (
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      {categoriesSearch.searchCategoriesByTerm.map(
                        (category) => (
                          <CategoryItem
                            key={`Category:${category?.slug}`}
                            slug={category?.slug!}
                          />
                        )
                      )}
                    </View>
                  )}
              </ResultBox>
            </>
          )}
        </>
      )}
    </Container>
  );
};
