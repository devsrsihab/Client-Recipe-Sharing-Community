import React from "react";
import Image from "next/image";

interface BannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  onButtonClick,
}) => {
  const words = title.split(" ");
  const highlightedWords = words.slice(-2);
  const regularWords = words.slice(0, -2);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden group">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent dark:from-[#0e1629]/80 dark:via-[#0e1629]/50" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-5 md:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {regularWords.join(" ")}{" "}
          <span className="text-[#6d28d9] dark:text-[#38bdf8]">
            {highlightedWords.join(" ")}
          </span>
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-prose">
            {subtitle}
          </p>
        )}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="px-6 py-2 text-white bg-[#0284c7] hover:bg-[#0369a1] dark:bg-black dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
