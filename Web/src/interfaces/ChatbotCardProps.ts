export default interface ChatbotCardProps {
    id: string
    name: string 
    description: string

}
export   interface ChatMessage {
    role: string
    content: string
}

export interface SendChatMessageDTO {
    chatbotId: string
    userMessage: string
}