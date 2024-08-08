import { InputHTMLAttributes } from "react"

export type InputProps = {
  isValid?: boolean
} & InputHTMLAttributes<HTMLInputElement>