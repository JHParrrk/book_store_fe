import {
  changePassword,
  login,
  resetRequest,
  signup,
  getMyUserInfo,
} from "../apis/auth.api";
import { AuthProps } from "../pages/signup";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { useState, useCallback } from "react"; // ✅ useCallback 추가

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isloggedIn, storeLogin, storeLogout } = useAuthStore();
  const [resetRequested, setResetRequested] = useState(false);

  const userSignup = useCallback(
    (data: AuthProps) => {
      signup(data).then(
        (res) => {
          showAlert("회원가입이 완료되었습니다.");
          navigate("/login");
        },
        (error) => {
          showAlert("회원가입에 실패했습니다.");
        }
      );
    },
    [navigate, showAlert]
  );

  const userLogin = useCallback(
    (data: AuthProps) => {
      login(data).then(
        (res) => {
          storeLogin(res.accessToken);
          showAlert("로그인이 완료되었습니다.");
          navigate("/");
        },
        (error) => {
          showAlert("로그인에 실패했습니다.");
        }
      );
    },
    [navigate, showAlert, storeLogin]
  );

  const userResetRequest = useCallback((data: AuthProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  }, []);

  const userResetPassword = useCallback(
    (data: AuthProps) => {
      changePassword(data).then(() => {
        showAlert("비밀번호가 초기화되었습니다.");
        navigate("/login");
      });
    },
    [navigate, showAlert]
  );

  // useCallback으로 감싸서 함수 객체 주소 고정
  const userGetMyInfo = useCallback(async () => {
    return getMyUserInfo();
  }, []);

  return {
    userSignup,
    userLogin,
    resetRequested,
    userResetRequest,
    userResetPassword,
    userGetMyInfo,
  };
};
