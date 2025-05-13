"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#f43f5e",
          "--normal-text": "#fff1f2",
          "--normal-border": "#be123c",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
