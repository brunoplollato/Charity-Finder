import { themeColors } from "../constants/themesColors";

interface Card {
  title: string;
  country: string;
  mission: string;
  image: string;
  url: string;
  themes: Theme[];
}

interface Theme {
  id: string;
  name: string;
}

const Card = ({ title, country, mission, image, url, themes }: Card) => {
  const getTailwindColorByKey = (key: any) => {
    return themeColors[key] || "bg-gray-300"; // Default to a neutral color if key is not found
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md sm:basis-1/4">
      <a href={url}>
        <img
          className="h-auto w-full"
          src={image}
          alt="Hollywood Sign on The Hill"
        />
      </a>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
          {title}
        </h5>
        <p className="mb-4 text-base text-neutral-600">
          <small>{country}</small>
        </p>
        {themes.map((theme: any) => {
          const color = getTailwindColorByKey(theme.id);
          return (
            <span
              key={theme.id}
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-${color}-700 ring-1 ring-inset ring-${color}-700/10 bg-${color}-40`}
            >
              {theme.name}
            </span>
          );
        })}
        <p className="my-4 text-base text-neutral-600 line-clamp-5">
          {mission}
        </p>
      </div>
    </div>
  );
};

export default Card;
