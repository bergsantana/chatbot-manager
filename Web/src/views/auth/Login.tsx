import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";
import Form from "../../components/organisms/Form";
import type { LoginDTO } from "../../api/Api.type";
import { useAuth } from "../../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loadUserInformation } = useAuth();
  const goToSignUp = () => navigate("/signup");
  const { user: userContext, setUser: setUserContext } =
    useContext(AuthContext);

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
      placeholder: "example@gmail.com",
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
          throw Error("Could not parse user information");
        }

        console.log("componente login", userContext, loaded);
      } catch (err) {
        console.log("err");
        console.log(err);
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
    </div>
  );
}
