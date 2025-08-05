import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User";
import type { Chatbot } from "../../api/Api.type";
import { ChatbotContext } from "../../context/ChatbotsContext";
import { saveLastUrl } from "../../utils/navigation";

function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [chatbots, setChatbots] = useState<Chatbot[] | null>(null);

  const { loadUserInformation } = useAuth();

  const location = useLocation();

  useEffect(() => {
    const refreshUserInformation = async () => {
      const userData = await loadUserInformation();
      if (userData) setUser(userData);
    };
    refreshUserInformation();
  }, []);

  useEffect(() => {
    saveLastUrl(location.pathname);
  }, [location.pathname]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ChatbotContext.Provider
        value={{ loadedChatbots: chatbots, setChatbots }}
      >
        <div>
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
