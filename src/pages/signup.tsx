import React from "react";
import styled from "styled-components";
import Title from "../components/commons/title";
import InputText from "../components/commons/inputText";
import Button from "../components/commons/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export interface AuthProps {
  email: string;
  password: string;
  name: string;
  address: string;
  phone_number: string;
}

const Signup = () => {
  const { userSignup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>();

  const onSubmit = (data: AuthProps) => {
    userSignup(data);
  };

  return (
    <>
      <Title size="large">회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="이름"
              inputType="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="error-text">이름을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="주소"
              inputType="text"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="error-text">주소를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="전화번호"
              inputType="text"
              {...register("phone_number", { required: true })}
            />
            {errors.phone_number && (
              <p className="error-text">전화번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0;
  }
`;

export default Signup;
