import {HTMLAttributes, ReactNode} from "react"

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode
}