import { cn } from "@/shared/lib";
import { Search } from "lucide-react";
import { memo } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setFocused: (value: boolean) => void;
  className?: string;
}

export const SearchWeatherInput = memo(
  ({ searchQuery, setSearchQuery, setFocused, className }: Props) => {
    return (
      <div
        className={cn(
          "flex items-center flex-1 bg-gray-100 pl-3 rounded-l-2xl",
          className,
        )}
      >
        <Search className="h-5 text-gray-400" />
        <input
          className="outline-none w-full bg-gray-100 pl-3"
          type="text"
          placeholder="Введите город..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  },
);
