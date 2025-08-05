import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";
import Form from "../../components/organisms/Form";
import type { LoginDTO } from "../../api/Api.type";
import { useAuth } from "../../hooks/useAuth";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Notification from "../../components/organisms/Notification";

export default function Login() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();
  const { login, loadUserInformation } = useAuth();
  const goToSignUp = () => navigate("/signup");
  const { setUser: setUserContext } = useContext(AuthContext);

  const fields = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      placeholder: "example@gmail.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "******",
    },
  ];

  const onSubmitLogin = async (inputs: Record<string, string>) => {
    const loginData = inputs as any as LoginDTO;
    if (loginData.email && loginData.password) {
      try {
        await login(loginData.email, loginData.password);
        const loaded = await loadUserInformation();
        if (loaded) {
          setUserContext(loaded);
          navigate("/chatbot/list");
        } else {
          setNotificationMessage("Invalid credentials");
          setShowNotification(true);
        }
      } catch (err: any) {
        setNotificationMessage(err?.message);
        setShowNotification(true);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl my-1.5">
      <div>
        <Text variant="subtitle">Chatbots made for you by you</Text>
      </div>

      <Form
        fields={fields}
        buttonLabel="Log in"
        onSubmit={(data) => {
          onSubmitLogin(data);
        }}
      />

      <div className="flex flex-col w-[10rem] mx-auto gap-2">
        <Text variant="caption">Not registered?</Text>
        <Button size="md" variant="ghost" onClick={goToSignUp}>
          Register here
        </Button>
      </div>

      {showNotification && (
        <Notification
          type="error"
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}
