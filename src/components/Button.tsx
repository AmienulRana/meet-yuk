import { IButton } from "@/libs/interface";

const theme = {
  outline: "border border-primary",
  background: "bg-primary text-white",
};

const sizes = {
  small: "w-max",
  large: "w-full",
};

export default function Button({
  children,
  className,
  size = "large",
  variant = "background",
  ...buttonProps
}: IButton) {
  return (
    <button
      {...buttonProps}
      className={`${theme[variant]} ${sizes[size]} ${className} px-3 py-1.5 rounded-full text-sm`}
    >
      {children}
    </button>
  );
}
