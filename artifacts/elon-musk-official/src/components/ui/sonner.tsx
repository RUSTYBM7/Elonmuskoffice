"use client"

import { Toaster as Sonner } from "sonner"
import { useTheme } from "@/hooks/use-theme"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()
  const resolved = theme === "dark" ? "dark" : "light"

  return (
    <Sonner
      theme={resolved as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-background",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
