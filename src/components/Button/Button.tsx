import cn from "classnames"
import s from "./Button.module.css"
import { ButtonProps } from "./Button.props"

export function Button({ children, className, appearance = "small", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        s["button"],
        s["accent"],
        className,
        {
          [s["small"]]: appearance === "small",
          [s["big"]]: appearance === "big"
        }
      )}
      {...props}
    >
      {children}
    </button>
  )
}
