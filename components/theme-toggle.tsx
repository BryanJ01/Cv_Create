"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent hover:bg-white/10 dark:hover:bg-white/10"
    >
      {theme === "light" ? <Moon className="h-5 w-5 text-stone-800" /> : <Sun className="h-5 w-5 text-white" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
