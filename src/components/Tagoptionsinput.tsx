import { useState, KeyboardEvent, ChangeEvent } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  placeholder = "Type and press Enter",
}) => {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim().length > 0) {
      e.preventDefault();
      onChange([...value, input.trim()]);
      setInput("");
    }
    if (e.key === "Backspace" && input === "" && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
      {value.map((tag, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-gray-100  rounded-full text-sm flex items-center gap-1"
        >
          {tag}
          <button type="button" onClick={() => removeTag(i)}>
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-w-[100px] outline-none text-sm"
      />
    </div>
  );
};

export default TagInput;
