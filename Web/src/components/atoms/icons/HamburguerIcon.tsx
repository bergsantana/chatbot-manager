import clsx from "clsx";

type Props = {
  isOpen?: boolean;
  className?: string;
};

export default function HamburgerIcon({
  isOpen = false,
  className = "",
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center w-6 h-6 cursor-pointer space-y-[5px] transition-all duration-300",
        className
      )}
    >
      <span
        className={clsx(
          "block h-0.5 w-6 bg-black transition-transform duration-300",
          isOpen && "transform rotate-45 translate-y-[7px]"
        )}
      />
      <span
        className={clsx(
          "block h-0.5 w-6 bg-black transition-opacity duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={clsx(
          "block h-0.5 w-6 bg-black transition-transform duration-300",
          isOpen && "transform -rotate-45 -translate-y-[7px]"
        )}
      />
    </div>
  );
}
