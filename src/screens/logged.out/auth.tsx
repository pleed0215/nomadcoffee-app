import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { ControlledInput } from "../../components/ControlledInput";
import { LoggedOutNavScreenParam } from "../../navigation/navs";
import { ButtonInactivable } from "../../components/ButtonInactivable";
import { useMutation } from "@apollo/client";
import { Login, LoginVariables } from "../../codegen/Login";
import { MUTATION_CREATE_ACCOUNT, MUTATION_LOGIN } from "../../apollo/queries";
import { Dimensions, Keyboard, Platform, TouchableOpacity } from "react-native";
import { makeLogin } from "../../apollo/client";
import {
  CreateAccount,
  CreateAccountVariables,
} from "../../codegen/CreateAccount";

import { DismissKeyboard } from "../../components/DismissKeyboard";
import { useEffect } from "react";

const windowHeight = Dimensions.get("window").height;

type FormProp = {
  email: string;
  username: string;
  password: string;
  password2: string;
};

const Container = styled.KeyboardAvoidingView`
  align-items: center;
  background-color: ${(props) => props.theme.background.primary};
  flex: 1;
  width: 100%;
`;

const BigTitle = styled.Text`
  font-size: 40px;
  font-family: "LuckiestGuy";
  color: ${(props) => props.theme.color.primary};
  margin-top: ${windowHeight * 0.15}px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-family: "LuckiestGuy";
  color: ${(props) => props.theme.color.primary};
  margin-top: ${windowHeight * 0.01}px;
  margin-bottom: 20px;
`;

const FormContainer = styled.ScrollView`
  width: 80%;
  flex: 0.9;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;
const ErrorMsg = styled.Text`
  color: red;
  font-style: italic;
  font-size: 14px;
  margin-top: 10px;
`;
const Message = styled.Text`
  font-family: "DoHyeon";
  font-size: 20px;
  color: ${(props) => props.theme.color.primary};
  text-align: center;
`;
const LinkMessage = styled.Text`
  color: ${(props) => props.theme.color.link};
  font-size: 20px;
  font-family: "DoHyeon";
  text-align: center;
`;

export const AuthScreen: React.FC<LoggedOutNavScreenParam<"Auth">> = ({
  route,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [login] = useMutation<Login, LoginVariables>(MUTATION_LOGIN, {
    onCompleted: (data) => {
      setLoading(false);

      if (data.login.ok && data.login.token) {
        makeLogin(data.login.token);
        navigation.replace("Home");
      } else {
        setError(`로그인 실패: ${data.login.error}`);
      }
    },
  });
  const [join] = useMutation<CreateAccount, CreateAccountVariables>(
    MUTATION_CREATE_ACCOUNT,
    {
      onCompleted: (data) => {
        setLoading(false);
        if (data.createAccount.ok) {
          alert("계정이 만들어졌습니다.");
          login({
            variables: {
              email: getValues("email"),
              password: getValues("password"),
            },
          });
        } else {
          setError(`계정 생성 실패: ${data.createAccount.error}`);
        }
      },
    }
  );
  const { control, getValues, formState, setFocus, handleSubmit, reset } =
    useForm<FormProp>({
      mode: "onBlur",
    });
  const { isCreating } = route.params;

  const onValid: SubmitHandler<FormProp> = (data) => {
    setLoading(true);
    const { email, password, username } = data;
    if (isCreating) {
      join({
        variables: {
          email,
          username,
          password,
        },
      });
    } else {
      login({
        variables: {
          email,
          password,
        },
      });
    }
  };
  const onNext = (inputName: keyof FormProp) => () => {
    switch (inputName) {
      case "email":
        setFocus(isCreating ? "username" : "password");
        break;
      case "username":
        setFocus("password");
        break;
      case "password":
        if (isCreating) {
          setFocus("password2");
        } else {
          Keyboard.dismiss();
        }
        break;
      default:
        Keyboard.dismiss();
        break;
    }
  };
  const onPressChangeAuth = () => {
    navigation.navigate("Auth", { isCreating: !isCreating });
  };

  useEffect(() => {
    reset({ username: "", email: "", password: "", password2: "" });
    setError(null);
  }, [isCreating]);

  return (
    <DismissKeyboard>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
        <BigTitle>Nomad Coffee</BigTitle>
        <Title>{isCreating ? "Sign Up" : "Log In"}</Title>
        <FormContainer>
          <ControlledInput
            control={control}
            name="email"
            defaultValue=""
            placeholder="이메일 주소"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onNext("email")}
            rules={{
              required: { value: true, message: "이메일을 입력해주세요." },
              pattern: {
                value: /\w+@\w+\.\w+/g,
                message: "올바른 이메일 주소를 입력해주세요.",
              },
              minLength: { value: 4, message: "4글자 이상 필요해요." },
              maxLength: { value: 30, message: "너무 길어요. 30글자 미만." },
            }}
          />
          {isCreating && (
            <ControlledInput
              control={control}
              name="username"
              defaultValue=""
              placeholder="유저이름"
              autoCorrect={false}
              keyboardType="ascii-capable"
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={onNext("username")}
              rules={{
                required: {
                  value: true,
                  message: "유저이름을 입력해주세요.",
                },
                minLength: { value: 4, message: "4글자 이상 필요해요." },
                maxLength: {
                  value: 16,
                  message: "너무 길어요. 16글자 미만.",
                },
              }}
            />
          )}
          <ControlledInput
            control={control}
            name="password"
            defaultValue=""
            placeholder="패스워드"
            secureTextEntry
            autoCapitalize="none"
            keyboardType="ascii-capable"
            returnKeyLabel={isCreating ? undefined : "로그인"}
            returnKeyType={isCreating ? "next" : undefined}
            last={!isCreating}
            onSubmitEditing={onNext("password")}
            rules={{
              required: { value: true, message: "암호를 입력해주세요." },
              minLength: { value: 8, message: "8글자 이상 필요해요." },
              maxLength: { value: 20, message: "너무 길어요. 20글자 미만." },
            }}
          />
          {isCreating && (
            <ControlledInput
              control={control}
              name="password2"
              defaultValue=""
              placeholder="패스워드 확인"
              secureTextEntry
              autoCapitalize="none"
              keyboardType="ascii-capable"
              returnKeyLabel="가입"
              onSubmitEditing={onNext("password2")}
              last
              rules={{
                required: { value: true, message: "암호를 확인해주세요." },
                validate: (password2) =>
                  password2 === getValues("password") ||
                  "패스워드가 일치하지 않습니다.",
              }}
            />
          )}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <ButtonWrapper>
            <ButtonInactivable
              fullWidth
              disabled={!formState.isValid}
              onPress={handleSubmit(onValid)}
              text={isCreating ? "Sign Up" : "Log in"}
              loading={loading}
            />
          </ButtonWrapper>

          <TouchableOpacity
            onPress={onPressChangeAuth}
            style={{ justifyContent: "center" }}
          >
            <LinkMessage>
              {isCreating ? "이미 가입하셨다면, 로그인" : "가입하시려면, 터치"}
            </LinkMessage>
          </TouchableOpacity>
        </FormContainer>
      </Container>
    </DismissKeyboard>
  );
};
