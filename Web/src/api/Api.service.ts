import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type {
  Chatbot,
  ChatSendMessageReponse,
  CreateChatbotDTO,
  LoginDTO,
  LoginResponse,
  SingUPDTO,
} from "./Api.type";
import { APIConfig } from "./Api.config";

let token: string | null = localStorage.getItem("app_token");

const axiosInstance: AxiosInstance = axios.create({
  baseURL: APIConfig.url,
  headers: {
    "Content-Type": "application/json",
  },
});

function parseError(error: any): string {
  if (error.response?.data?.message) return error.response.data.message;
  return error.message || "Unknown error";
}

axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use((intc) => {
  return intc;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("app_token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export class APIService {
  static login({
    email,
    password,
  }: LoginDTO): Promise<AxiosResponse<LoginResponse>> {
    try {
      return axiosInstance.post("auth/login", { email, password }) as Promise<
        AxiosResponse<LoginResponse>
      >;
    } catch (err) {
      throw new Error(parseError(err));
    }
  }

  static signup= async (data: SingUPDTO) =>  {
    try { 
      return axiosInstance.post('/auth/signup', data)   
    } catch (err) {
      console.log('Error creating user', err)
    }
  }

  static findBotsByUserPaginated = async (page: number, pageSize: number) => {
    try {
      return axiosInstance.get(
        `/chatbot/find-all?page=${page}&pagesize=${pageSize}`
      );
    } catch (err) {
      throw new Error(parseError(err));
    }
  };

  static updateChatbotInfo = async (assistant: Chatbot) => {
    try {
      return axiosInstance.put(`/chatbot/update/${assistant.id}`, assistant);
    } catch (err) {
      throw new Error(parseError(err));
    }
  };

  static createChatbot = async (assistant: CreateChatbotDTO ) => {
    try {
      return axiosInstance.post('/chatbot/create', assistant)
    } catch (err) {
      console.log('Error creating chatbot', err  )
    }
  }

  static sendMessageToChatbot = async (
    chatbotId: string,
    userMessage: string
  ) => {
    try {
      return (await axiosInstance.post("/chatbot/send-message", {
        chatbotId,
        userMessage,
      })) as AxiosResponse<ChatSendMessageReponse>;
    } catch (err) {
      throw new Error(parseError(err));
    }
  };
}

export default APIService;
