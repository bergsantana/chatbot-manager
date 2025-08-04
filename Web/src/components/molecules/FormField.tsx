import Input from "../atoms/Input";
import Text from "../atoms/Text";

type Props = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};

export default function FormField({ label, ...props }: Props) {
  return (
    <div className="space-y-1">
      <Text variant="label" className="block text-sm font-medium text-gray-700">
        {label}
      </Text>
      <Input {...props} />
    </div>
  );
}
