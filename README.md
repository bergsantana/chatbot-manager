### Projeto de Chatbot com Integração à Inteligência Artificial
Este projeto descreve um chat conectado a uma LLM hospedada localmente com Docker e Ollama

### Funcionalidades
- Registro e autenticação
- Criação e edição de chatbots
  - "Description" define como a LLM deve se comportar
 
### Arquitetura 
#### Backend 
 - Clean Architecture para estrutura de pastas: um padrão de projeto que enfatiza a separação de responsabilidade
 - Banco de dados MongoDb Chave-Valor para persistencia de dados relevantes a LLM
 - Redis para cache
 - Ollama para gerenciar LLMs
 - Docker para garantir disponibilidade 
```
Server/
├── ChatbotManager.API/              ← Camada de Apresentação (controllers)
├── ChatbotManager.Application/      ← Camada de Aplicação (casos de uso, interfaces)
├── ChatbotManager.Domain/           ← Camada de Domínio (entidades)
├── ChatbotManager.Infrastructure/   ← Camada de Infraestrutura (MongoDB, etc.)
 
```
#### Frontend
- React com TailwindCSS para telas de Autenticação e gerenciamento de bots
```
src/
├── components/            # Compontents reutilizavés (Atomic Design)
│   ├── atoms/             # (Button, Icon, Text)
│   ├── molecules/         # Combinações de átomos (FormField, Notification)
│   ├── organisms/         # Combinações de moleculas (LoginForm, ChatHeader)
├── contexts/              # Context Providers (ex: AuthContext)
├── hooks/                 # Hooks customizados (ex: useAuth, useChatbots)
├── api/                   # Axios + conexão a API
│   utils/                 # helpers
├── views/                 # Páginas da aplicação
│   ├── Home/
│   ├── Auth/
│   ├── Chatbots/          
│   │   ├── List.tsx
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   ├── Conversation.tsx
├── router/                # Rotas 
├── main.tsx               # Começo da aplicação
```
 

### Tech
#### Backend
 - Ollama with llama3 model
 - .NET 9
 - Mongodb
 - Redis
 - Vite React
 - TailwindCSS
 - Docker


### Instalação
 #### Server
 - Clone esse repositório
 - Comece os containers da pasta raiz:
   ```
   docker compose up -d
    ```
 - Baixe e comece a hospedar llama3:
   ```
   docker exec -it ollama ollama pull llama3
   ```
 #### Frontend
 - Acesse a url no navegador
   ```
    http://127.0.0.1:5173
   ```

### Mobile Demo
![ezgif-8ef1492710c2bb](https://github.com/user-attachments/assets/dcf3a286-1373-4f1b-bcf2-2eca7b092ee7)

