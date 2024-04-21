"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="group" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0 group-hover:text-white" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="group" onClick={() => setTheme("light")}>
          <p className="group-hover:text-white">Light</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="group" onClick={() => setTheme("dark")}>
          <p className="group-hover:text-white">Dark</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="group" onClick={() => setTheme("system")}>
          <p className="group-hover:text-white">System</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
