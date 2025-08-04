import Input from "../../components/atoms/Input";
import Text from "../../components/atoms/Text";

export default function Me() {
  const user = { name: 'John Doe', email: 'john@example.com' };  
    return (
        <div className="p-4">
            <Text variant="title">Account Info</Text>

            <Text variant="label">Name:</Text>
            <Input value={user.name} />

            <Text variant="label">Email:</Text>
            <Input value={user.email} />
            
        </div>
    )
}