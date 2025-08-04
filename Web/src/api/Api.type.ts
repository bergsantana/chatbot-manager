export interface LoginDTO {
    email: string
    password: string
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
    messages: {
        role: "assistant" | 'user' | 'system'
        content: string
    }[]
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