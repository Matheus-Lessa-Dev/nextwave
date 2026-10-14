import { ArrowRight } from "lucide-react";

type Props<T extends string> = {
  options: readonly { id: T; label: string; description?: string }[];
  onSelect: (id: T) => void;
  featuredId?: T;
};

export function ChatOptions<T extends string>({ options, onSelect, featuredId }: Props<T>) {
  return (
    <div className="nw-chat-options">
      {options.map(option => (
        <button key={option.id} className={option.id === featuredId ? "nw-chat-featured" : undefined} type="button" onClick={() => onSelect(option.id)}>
          <span>{option.label}{option.description && <small>{option.description}</small>}</span><ArrowRight size={15} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
