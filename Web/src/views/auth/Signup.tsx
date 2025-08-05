import { useState } from "react";
import Input from "../../components/atoms/Input";
import Text from "../../components/atoms/Text";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { singup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name && password && email) {
      singup({
        name,
        password,
        email,
      });
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-96 p-2">
      <Text variant="title">Signup</Text>

      <Text variant="label">Name</Text>
      <Input
        className="max-w-[340px] border-[1px] rounded-sm border-gray-500 p-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Text variant="label">email</Text>
      <Input
        className="max-w-[340px] border-[1px] rounded-sm border-gray-500 p-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Text variant="label">Password</Text>
      <Input
        className="max-w-[340px] border-[1px] rounded-sm border-gray-500 p-2"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button className="w-52 mx-auto" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
