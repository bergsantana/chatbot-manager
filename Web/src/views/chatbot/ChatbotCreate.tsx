import Text from "../../components/atoms/Text";
import Form, { type FormFieldType } from "../../components/organisms/Form";

export default function CreateChatbot() {
  const fields: FormFieldType[] = [
    {
      name: "chatbotName",
      label: "Enter chat bot name",
      type: "text",
      placeholder: "Helpful History Professor",
    },

    {
      name: "description",
      label: "Enter the descriptiojn",
      type: "text",
      placeholder: "A old professor who gives succints answers ",
    },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Text variant="title"> Create Chatbot</Text>
      <Form
        fields={fields}
        buttonLabel="Submit Chatbot"
        onSubmit={() => console.log("SUBMITEd")}
      ></Form>
    </div>
  );
}
