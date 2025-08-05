### Projeto de Chatbot com Integração à Inteligência Artificial
Este projeto descreve um chat conectado a uma LLM hospedada localmente com Docker e Ollama

### Funcionalidades
- Registro e autenticação
- Criação e edição de chatbots
  - "Description" define como a LLM deve se comportar
 
### Arquitetura 
#### Backend 
 - Clean Architecture (Arquitetura Limpa) é um padrão de projeto que enfatiza a separação de responsabilidade
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
```
src/
├── components/            # Reusable UI components (Atomic Design)
│   ├── atoms/             # Smallest building blocks (Button, Icon, Text)
│   ├── molecules/         # Combinations of atoms (FormField, Notification)
│   ├── organisms/         # Complex UI sections (LoginForm, ChatHeader)
├── contexts/              # React context providers (e.g., AuthContext)
├── hooks/                 # Custom hooks (e.g., useAuth, useChatbots)
├── api/                   # Axios setup + endpoint functions
│   utils/                 # Formatters, validators, helpers
├── views/                 # Route pages (mapped in router)
│   ├── Home/
│   ├── Auth/
│   ├── Chatbots/          # Feature folder for chatbot-related pages
│   │   ├── List.tsx
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   ├── Conversation.tsx
├── router/                # React Router config with protected routes
├── main.tsx               # Entry point
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


### Installation
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

### Demo
