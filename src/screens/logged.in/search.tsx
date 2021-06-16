import React, { useLayoutEffect, useState } from "react";

import {
  Dimensions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { LoggedInStackScreenParam } from "../../navigation/navs";
import { Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { useEffect } from "react";
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

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const SearchResultText = styled.Text`
  font-size: 24px;
  font-family: "DoHyeon";
  margin-bottom: 10px;
`;

const ResultText = styled.Text`
  font-size: 20px;
  font-family: "DoHyeon";
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

  const theme = useTheme();

  const onSubmitSearch: SubmitEditingHandler = (_) => {
    setTerm(value);
  };
  const [searchUsers, { data: usersSearch, loading: usersLoading }] =
    useLazyQuery<SearchUsers, SearchUsersVariables>(QUERY_SEARCH_USER);
  const [searchShops, { data: shopsSearch, loading: shopsLoading }] =
    useLazyQuery<SearchShops, SearchShopsVariables>(QUERY_SEARCH_SHOPS);
  const [
    searchCategories,
    { data: categoriesSearch, loading: categoriesLoading },
  ] = useLazyQuery<SearchCategory, SearchCategoryVariables>(
    QUERY_SEARCH_CATEGORY
  );

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
    if (term !== "" && term.length > 1) {
      searchUsers({ variables: { term } });
      searchCategories({ variables: { term } });
      searchShops({ variables: { term } });
    }
  }, [term]);

  return (
    <Container>
      <SearchResultText>
        {usersLoading || categoriesLoading || shopsLoading
          ? `'${term}' 검색중 ...`
          : `'${term}' 검색 결과`}
      </SearchResultText>
      <ResultText>유저명 검색 결과</ResultText>
      <ResultText>카페 검색 결과</ResultText>
      <ResultText>카테고리 검색 결과</ResultText>
    </Container>
  );
};
