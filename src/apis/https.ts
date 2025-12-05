import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken, setToken } from "../stores/authStore";

const BASE_URL = "http://localhost:3000";
const DEFAULT_TIMEOUT = 30000;

// 여러 401 요청 동기화 변수
let isRefreshing = false;
let failedQueue: any[] = [];

// 큐에 저장된 요청 처리 함수
const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  failedQueue = [];
};

// Axios 인스턴스 생성
export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  // 요청 인터셉터 - 액세스 토큰 헤더 추가
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken(); // 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터 - 401 에러 처리
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 액세스 토큰 만료: 401 반환 시
      if (error.response?.status === 401 && !originalRequest._retry) {
        // 토큰 재발급 중인지 확인
        originalRequest._retry = true;

        if (isRefreshing) {
          // 리프레시 중인 경우 대기 큐에 요청 추가
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                // 새 토큰으로 재시도
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject: (err: unknown) => reject(err),
            });
          });
        }

        isRefreshing = true;

        try {
          // 리프레시 토큰 갱신
          const refreshResponse = await axios.post(
            `${BASE_URL}/users/refresh`,
            {},
            { withCredentials: true }
          );

          const { accessToken } = refreshResponse.data;
          setToken(accessToken); // 새 토큰 저장

          // 큐에 있는 요청 재시도
          processQueue(null, accessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null); // Fail 처리
          removeToken(); // 만료된 토큰 삭제
          window.location.href = "/login"; // 로그인 페이지로 이동
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error); // 다른 에러
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <R = any, P = any>(
  method: RequestMethod,
  url: string,
  payload?: P
) => {
  let response;

  switch (method) {
    case "get":
      response = await httpClient.get<R>(url);
      break;
    case "post":
      response = await httpClient.post<R>(url, payload);
      break;
    case "put":
      response = await httpClient.put<R>(url, payload);
      break;
    case "delete":
      response = await httpClient.delete<R>(url);
      break;
  }

  return response.data;
};
