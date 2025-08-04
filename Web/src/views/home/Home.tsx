import { Outlet } from "react-router-dom";
import Header from "../../components/organisms/Header";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import type { Chatbot } from "../../api/Api.type";
import { ChatbotContext } from "../../context/ChatbotsContext";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [chatbots, setChatbots] = useState<Chatbot[] | null>(null);

  const { loadUserInformation } = useAuth();

  useEffect(() => {
    const refreshUserInformation = async () => {
      const userData = await loadUserInformation();
      if (userData) setUser(userData);
    };
    refreshUserInformation();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ChatbotContext.Provider
        value={{ loadedChatbots: chatbots, setChatbots }}
      >
        <div>
          <input value={JSON.stringify(user)} disabled />
          <Header loggedIn={!!user?.authToken} />
          <div className="bg-white my-1.5 rounded-sm">
            <Outlet />
          </div>
        </div>
      </ChatbotContext.Provider>
    </AuthContext.Provider>
  );
}

export default Home;
