import { changePassword, login, resetRequest, signup } from "../apis/auth.api";
import { AuthProps } from "../pages/signup";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isloggedIn, storeLogin, storeLogout } = useAuthStore();
  const [resetRequested, setResetRequested] = useState(false);

  const userSignup = (data: AuthProps) => {
    signup(data).then(
      (res) => {
        showAlert("회원가입이 완료되었습니다.");
        navigate("/login");
      },
      (error) => {
        showAlert("회원가입에 실패했습니다.");
      }
    );
  };
  const userLogin = (data: AuthProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert("로그인이 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패했습니다.");
      }
    );
  };
  const userResetRequest = (data: AuthProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };
  const userResetPassword = (data: AuthProps) => {
    changePassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  return {
    userSignup,
    userLogin,
    resetRequested,
    userResetRequest,
    userResetPassword,
  };
};
