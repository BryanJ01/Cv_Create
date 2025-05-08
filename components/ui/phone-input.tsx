"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Lista simplificada de países con sus códigos
const countries = [
  { name: "España", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "México", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷" },
  { name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴" },
  { name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱" },
  { name: "Perú", code: "PE", dial: "+51", flag: "🇵🇪" },
  { name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨" },
  { name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪" },
  { name: "Estados Unidos", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "Canadá", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "Brasil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾" },
  { name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾" },
  { name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function PhoneInput({ value, onChange, placeholder = "Teléfono", className }: PhoneInputProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  // Extraer el código de país y el número
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/\D/g, "")
    onChange(`${selectedCountry.dial} ${phoneNumber}`)
  }

  // Extraer solo el número sin el código de país
  const getPhoneWithoutCode = () => {
    if (!value) return ""
    const parts = value.split(" ")
    return parts.length > 1 ? parts[1] : value
  }

  return (
    <div className={cn("flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[110px] justify-between border-r-0 rounded-r-none"
          >
            <span className="flex items-center gap-1 truncate">
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.dial}</span>
            </span>
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar país..." />
            <CommandList>
              <CommandEmpty>No se encontró ningún país.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => {
                      setSelectedCountry(country)
                      // Actualizar el número con el nuevo código de país
                      onChange(`${country.dial} ${getPhoneWithoutCode()}`)
                      setOpen(false)
                    }}
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{country.dial}</span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        selectedCountry.code === country.code ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={getPhoneWithoutCode()}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="rounded-l-none"
      />
    </div>
  )
}
