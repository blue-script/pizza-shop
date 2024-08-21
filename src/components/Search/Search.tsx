import {forwardRef} from "react"
import s from "./Search.module.css"
import cn from "classnames"
import {SearchProps} from "./Search.props"

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({
  className,
  isValid = true,
  ...rest
}: SearchProps, ref) {

  return (
    <div className={s.input_wrapper}>
      <input
        {...rest}
        ref={ref}
        className={
          cn(s["input"],
            className,
            {
              [s["invalid"]]: !isValid
            }
          )
        }
      />
      <img className={s.icon} src="/search-icon.svg" alt="search icon"/>
    </div>
  )
})