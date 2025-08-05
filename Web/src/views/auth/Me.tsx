import { useContext } from "react";
import Input from "../../components/atoms/Input";
import Text from "../../components/atoms/Text";
import { AuthContext } from "../../context/AuthContext";

export default function Me() {
  //const user = { name: 'John Doe', email: 'john@example.com' };  
    const {user } = useContext(AuthContext)
    return (
        <div className="flex flex-col p-4">
            <Text variant="title">Account Info</Text>

            <Text variant="label">Email:</Text>
            <Input value={user?.email} disabled />

            <Text variant="label">Email:</Text>
            <Input value={user?.email} disabled/>
            
        </div>
    )
}