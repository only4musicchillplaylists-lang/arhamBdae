import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { MusicPlayer } from "./MusicPlayer";
import { Home, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  // If on landing page (root), don't show layout
  if (location === "/") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/home", icon: Home, label: "Letter" },
    { href: "/fun", icon: Gamepad2, label: "Fun Zone" },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header for Desktop */}
      <header className="hidden md:flex items-center justify-between px-8 py-6 fixed top-0 w-full z-40 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Arham's 18th
        </h1>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/30",
              location === item.href 
                ? "bg-white/40 text-purple-900 font-medium shadow-sm" 
                : "text-purple-700/80 hover:text-purple-900"
            )}>
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="md:pt-24 min-h-screen">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-6"
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/30 p-2 z-40 flex justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "flex flex-col items-center p-2 rounded-xl transition-all w-20",
            location === item.href 
              ? "text-pink-600 bg-pink-50" 
              : "text-gray-500 hover:text-purple-600"
          )}>
              <item.icon className={cn("w-6 h-6 mb-1", location === item.href && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <MusicPlayer />
    </div>
  );
}
