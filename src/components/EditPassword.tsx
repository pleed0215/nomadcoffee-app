import React from "react";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { MUTATION_EDIT_PROFILE, MUTATION_LOGIN } from "../apollo/queries";
import { EditProfile, EditProfileVariables } from "../codegen/EditProfile";
import { Login, LoginVariables } from "../codegen/Login";
import { SeeMe_me } from "../codegen/SeeMe";
import { ControlledInput } from "./ControlledInput";
import { ButtonInactivable } from "./ButtonInactivable";

type PasswordForm = {
  current: string;
  password: string;
  check: string;
};

const Form = styled.ScrollView`
  padding: 10px;
  width: 100%;
`;
const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

export const EditPassword: React.FC<{ me: SeeMe_me }> = ({ me }) => {
  const { control, getValues, handleSubmit, formState, setError } =
    useForm<PasswordForm>({
      mode: "onChange",
    });

  const [loading, setLoading] = useState(false);
  const [updateProfile] = useMutation<EditProfile, EditProfileVariables>(
    MUTATION_EDIT_PROFILE,
    {
      onCompleted: (data) => {
        setLoading(false);
        if (data.editProfile.ok) {
          alert("패스워드가 변경 되었습니다.");
        } else {
          alert(`패스워드 변경 실패: ${data.editProfile.error}`);
        }
      },
    }
  );
  const [login] = useMutation<Login, LoginVariables>(MUTATION_LOGIN);
  const onValid = async (data: PasswordForm) => {
    setLoading(true);
    const { data: loginResult } = await login({
      variables: { email: me.email, password: data.current },
    });

    if (loginResult?.login.ok) {
      updateProfile({
        variables: {
          id: me.id,
          password: data.password,
        },
      });
    } else {
      setError("current", { message: "현재 패스워드가 일치하지 않습니다." });
      setLoading(false);
    }
  };

  return (
    <Form showsVerticalScrollIndicator={false}>
      <ControlledInput
        control={control}
        name="current"
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "8글자 이상 입력해주세요.",
          },
          maxLength: {
            value: 18,
            message: "18글자 이하로 입력해주세요.",
          },
        }}
        textContentType="password"
        secureTextEntry
        keyboardType="ascii-capable"
        label="현재 암호"
        placeholder="현재 암호를 입력하세요."
      />
      <ControlledInput
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "8글자 이상 입력해주세요.",
          },
          maxLength: {
            value: 18,
            message: "18글자 이하로 입력해주세요.",
          },
        }}
        textContentType="password"
        secureTextEntry
        keyboardType="ascii-capable"
        name="password"
        label="바꿀 암호"
        placeholder="바꾸실 암호를 입력하세요."
      />

      <ControlledInput
        label="암호 확인"
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "8글자 이상 입력해주세요.",
          },
          maxLength: {
            value: 18,
            message: "18글자 이하로 입력해주세요.",
          },
          validate: {
            value: (value) =>
              value === getValues("password") ||
              "패스워드가 일치하지 않습니다.",
          },
        }}
        control={control}
        name="check"
        textContentType="password"
        secureTextEntry
        keyboardType="ascii-capable"
        placeholder="암호를 확인해주세요."
      />

      <ButtonWrapper>
        <ButtonInactivable
          text="패스워드 변경"
          loading={loading}
          onPress={handleSubmit(onValid)}
          disabled={!formState.isValid}
          fullWidth
        />
      </ButtonWrapper>
    </Form>
  );
};
