import Input from "../../components/atoms/Input";
import Text from "../../components/atoms/Text";

export default function Signup() {
  return (
    <>
      <Text variant="title">Signup</Text>

      <Text variant="label">Name</Text>
      <Input placeholder="Name" />

      <Text variant="label">email</Text>
      <Input placeholder="email" />

      <Text variant="label">Password</Text>
      <Input placeholder="password" type="password" />
    </>
  );
}
