import { type Weather } from "@/entities/weather";
import { Link } from "react-router-dom";
import SnowyImg from "@/shared/assets/icon/snowy.png";
import { AppImage } from "@/shared/ui/AppImage";
import { cn } from "@/shared/lib";
import { memo } from "react";

interface Props {
  weather: Weather;
  onClickItem: (id: number) => void;
  className?: string;
}

export const SearchWeatherItem = memo(
  ({ weather: { id, city, icon }, onClickItem, className }: Props) => {
    return (
      <Link
        onClick={() => onClickItem(id)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer",
          className,
        )}
        to={`/weather/${city}`}
      >
        <AppImage
          className="rounded-lg h-8 w-8 bg-slate-300"
          src={icon}
          errorFallback={
            <img
              src={SnowyImg}
              className="rounded-lg h-8 w-8"
              alt="Image didn't load"
            />
          }
          alt={city}
        />
        <span>{city}</span>
      </Link>
    );
  },
);
