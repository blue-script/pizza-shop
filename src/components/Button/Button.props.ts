import { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonProps = {
  children: ReactNode
  appearance?: "small" | "big"
} & ButtonHTMLAttributes<HTMLButtonElement>