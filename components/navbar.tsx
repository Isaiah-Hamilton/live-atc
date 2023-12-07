'use client'

import { Moon, Sun, MenuIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="aspect-square m-1" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Set Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Navbar = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const handleInputChange = (event: any) => {
    setSearch(event.target.value)
  }

  const handleInputEnter = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      router.push(`/search?keyword=${search}`)
    }
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-6">
      <nav className="relative max-w-[85rem] w-full mx-auto sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-none text-xl font-semibold">
            Live ATC
          </Link>
          <div className="sm:hidden">
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </div>
        </div>
        <div className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            <Link href="/airport" className="font-medium">
              Airports
            </Link>

            <div className="flex items-center sm:ms-auto">
              <Input
                type="search"
                value={search}
                placeholder="Search"
                className="m-1"
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleInputEnter(e)}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
