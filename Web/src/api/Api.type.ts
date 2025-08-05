export interface LoginDTO {
    email: string
    password: string
}

export interface SingUPDTO extends LoginDTO {
    name: string
}

export interface LoginResponse {
    token: string
    user: {
        id: string,
        name: string,
        email: string,
        password: string
    }
}

export interface Chatbot {
    id: string
    name: string
    description: string
    owner: string
    messages: ChatbotMessage[]
}

export interface CreateChatbotDTO{
    name: string, 
    description: string,
    owner: string
}

export interface ChatbotMessage {
    role: "assistant" | 'user' | 'system'
       content: string
}

export interface ChatbotListResponse {
    items: Chatbot[]
    totalCount: number,
    pageNumber: number,
    pageSize: number
}

export interface ChatSendMessageReponse {
    reply: string
}