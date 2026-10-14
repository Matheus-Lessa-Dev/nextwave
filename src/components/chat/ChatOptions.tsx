import { ArrowRight } from "lucide-react";

type Props<T extends string> = {
  options: readonly { id: T; label: string }[];
  onSelect: (id: T) => void;
};

export function ChatOptions<T extends string>({ options, onSelect }: Props<T>) {
  return (
    <div className="nw-chat-options">
      {options.map(option => (
        <button key={option.id} type="button" onClick={() => onSelect(option.id)}>
          <span>{option.label}</span><ArrowRight size={15} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
