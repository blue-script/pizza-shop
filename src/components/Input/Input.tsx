import {forwardRef} from "react"
import s from "./Input.module.css"
import cn from "classnames"
import {InputProps} from "./Input.props"

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  className,
  isValid = true,
  ...rest
}: InputProps, ref) {
  const commonClass = cn(
    s.input,
    className,
    {
      [s.invalid]: !isValid
    }
  )

  return (
    <input
      {...rest}
      ref={ref}
      className={commonClass}
    />
  )
})