import s from "./Heading.module.css"
import cn from "classnames"
import {HeadingProps} from "./Heading.props"

export const Heading = (props: HeadingProps) => {
  const {children, className, ...rest} = props

  return (
    <h2 className={cn(s.heading, className)} {...rest}>
      {children}
    </h2>
  )
}
