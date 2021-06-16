import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { MUTATION_EDIT_PROFILE } from "../apollo/queries";
import { EditProfile, EditProfileVariables } from "../codegen/EditProfile";
import { SeeMe_me } from "../codegen/SeeMe";
import { ControlledInput } from "./ControlledInput";
import { ButtonInactivable } from "./ButtonInactivable";

interface ProfileForm {
  username: string;
  email: string;
  name: string;
  location: string;
  githubUsername: string;
}

const Form = styled.ScrollView`
  padding: 10px;
  width: 100%;
`;
const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

export const ProfileEdit: React.FC<{ me: SeeMe_me }> = ({ me }) => {
  const { control, handleSubmit, formState } = useForm<ProfileForm>({
    mode: "onChange",
    defaultValues: {
      username: me.username,
      email: me.email,
      githubUsername: me.githubUsername || "",
      location: me.location || "",
      name: me.name || "",
    },
  });
  const [editProfile] = useMutation<EditProfile, EditProfileVariables>(
    MUTATION_EDIT_PROFILE,
    {
      onCompleted: (data) => {
        setLoading(false);
        if (data.editProfile.ok) {
          alert("프로필이 저장되었습니다.");
        } else {
          alert("프로필 저장에 실패했습니다.");
        }
      },
    }
  );
  const [loading, setLoading] = useState(false);

  const onValid = (data: ProfileForm) => {
    setLoading(true);
    editProfile({
      variables: {
        id: me.id,
        ...(data.username !== me.username && { username: data.username }),
        ...(data.email !== me.email && { email: data.email }),
        ...(data.location !== "" &&
          data.location !== me.location && { location: data.location }),
        ...(data.name !== "" && data.name !== me.name && { name: data.name }),
        ...(data.githubUsername !== "" &&
          data.githubUsername !== me.githubUsername && {
            githubUsername: data.githubUsername,
          }),
      },
      update(cache, result) {
        if (result.data?.editProfile.ok) {
          cache.modify({
            id: `User:${me.id}`,
            fields: {
              username: () => data.username,
              name: () => data.name,
              email: () => data.email,
              githubUsername: () => data.githubUsername,
              location: () => data.location,
            },
          });
        } else {
          window.alert(`업데이트 실패: ${result.data?.editProfile.error}`);
        }
      },
    });
  };
  return (
    <Form showsVerticalScrollIndicator={false}>
      <ControlledInput
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 4,
            message: "4글자 이상 입력해주세요",
          },
          maxLength: {
            value: 20,
            message: "20글자 이하로 입력해주세요.",
          },
        }}
        name="username"
        keyboardType="ascii-capable"
        placeholder="사용자이름"
        label="사용자이름"
      />

      <ControlledInput
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /\w+@\w+\.\w+/g,
            message: "이메일 주소가 아닙니다.",
          },
        }}
        name="email"
        keyboardType="email-address"
        placeholder="이메일 주소를 입력해주세요."
        label="이메일 주소"
      />
      <ControlledInput
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: "3글자 이상 입력해주세요",
          },
          maxLength: {
            value: 20,
            message: "20글자 이하로 입력해주세요.",
          },
        }}
        name="name"
        keyboardType="ascii-capable"
        placeholder="성함을 입력해주세요."
        label="성함"
      />
      <ControlledInput
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: "3글자 이상 입력해주세요",
          },
          maxLength: {
            value: 39,
            message: "39글자 이하로 입력해주세요.",
          },
        }}
        name="githubUsername"
        keyboardType="ascii-capable"
        placeholder="깃허브 유저명을 입력해주세요."
        label="깃허브 유저명"
      />
      <ControlledInput
        control={control}
        rules={{
          minLength: {
            value: 4,
            message: "4 글자 이상 입력해주세요.",
          },
          maxLength: {
            value: 100,
            message: "100글자 이하로 입력해주세요.",
          },
        }}
        name="location"
        keyboardType="ascii-capable"
        placeholder="지역 또는 위치를 입력해주세요."
        label="지역, 위치"
      />

      <ButtonWrapper>
        <ButtonInactivable
          text="프로필 변경"
          loading={loading}
          onPress={handleSubmit(onValid)}
          disabled={!formState.isValid}
          fullWidth
        />
      </ButtonWrapper>
    </Form>
  );
};
