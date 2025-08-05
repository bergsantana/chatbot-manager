import Text from "./Text";

interface NumberInputProps {
  numInput: number;
  label: string;
  onChange: (param: number) => void;
  disabled: boolean;
  className?: string
}

export default function NumberInput({
  numInput,
  label,
  onChange,
  disabled,
  className
}: NumberInputProps) {
  return (
    <div className={`text-gray-600 mb-1  `} >
      <Text className="text-sm">
        {label}
        <input
          type="number"
          min={1}
          value={numInput}
          onWheel={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.target.blur();
            e.preventDefault();
            e.stopPropagation();
            setTimeout(() => {
              e.target.focus();
            }, 0);
            onChange(Number(e.target.value));
          }}
          className={`w-12 mx-1 px-0.5 py-2  text-center rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
          disabled={disabled}
        />
      </Text>
    </div>
  );
}
