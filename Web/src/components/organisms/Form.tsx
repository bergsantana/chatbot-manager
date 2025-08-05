import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

export type FormFieldType = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

type Props = {
  fields: FormFieldType[];
  buttonLabel: string;
  onSubmit: (formData: Record<string, string>) => void;
};

export default function Form({ fields, buttonLabel, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData: Record<string, string> = {};
    fields.forEach((field) => {
      formData[field.name] = data.get(field.name)?.toString() ?? "";
    });
    onSubmit(formData);
  };

  return (
    <form className="space-y-4 max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormField key={field.name} {...field} />
      ))}
      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
}
