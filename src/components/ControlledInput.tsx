import React from "react";
import * as ReactNative from "react-native";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  FieldPath,
} from "react-hook-form";

import { TextInputProps } from "react-native";

import styled, { css } from "styled-components/native";

const Input = styled.TextInput<{ isError?: boolean }>`
  border: 1px solid
    ${(props) => (props.isError === true ? "red" : props.theme.color.border)};
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  font-size: 20px;
  font-family: "DoHyeon";
`;

const InputWrapper = styled.View<{ last?: boolean }>`
  ${(props) =>
    !props.last &&
    css`
      margin-bottom: 20px;
    `};
`;

const ErrorMsg = styled.Text`
  color: red;
  font-style: italic;
  font-size: 14px;
  margin-top: 4px;
`;

type ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TextInputProps &
  UseControllerProps<TFieldValues, TName> & { last?: boolean; label?: string };

const Label = styled.Text`
  font-size: 16px;
  font-family: "DoHyeon";
  color: ${(props) => props.theme.color.primary};
  margin-bottom: 3px;
`;

type ControlledInputFuncType = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>(
  props: ControlledInputProps<TFieldValues, TName>
) => JSX.Element;

export const ControlledInput: ControlledInputFuncType = ({
  control,
  name,
  defaultValue,
  rules,
  last,
  label,
  ...rest
}) => (
  <Controller
    control={control}
    render={({ field, fieldState }) => (
      <InputWrapper last={last}>
        {label && <Label>{label}</Label>}
        {/* @ts-ignore */}
        <Input
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value as string | undefined}
          ref={field.ref}
          isError={Boolean(fieldState.error)}
          {...rest}
        />
        {fieldState.error && <ErrorMsg>{fieldState.error.message}</ErrorMsg>}
      </InputWrapper>
    )}
    rules={rules}
    name={name}
    defaultValue={defaultValue}
  />
);
