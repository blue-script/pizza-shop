import { InputHTMLAttributes } from "react"

export type SearchProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>