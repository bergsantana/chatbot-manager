import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import Me from "../views/auth/Me";
import CreateChatbot from "../views/chatbot/ChatbotCreate";
import EditChatbot from "../views/chatbot/ChatbotEdit";
import ChatbotPage from "../views/chatbot/ChatbotPage";
import ChatbotConversation from "../views/chatbot/ChatbotConversation";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../views/home/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Me />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot/create"
            element={
              <ProtectedRoute>
                <CreateChatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot/edit/:id"
            element={
              <ProtectedRoute>
                <EditChatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot/chat/:id"
            element={
              <ProtectedRoute>
                <ChatbotConversation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot/list"
            element={
              <ProtectedRoute>
                <ChatbotPage />
              </ProtectedRoute>
            }
          />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
