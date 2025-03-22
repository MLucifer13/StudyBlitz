import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Settings,
  Calendar,
  CheckSquare,
  Clock,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  activeItem?: string;
}

const Navbar = ({
  isDarkMode = true,
  onToggleTheme = () => {},
  activeItem = "dashboard",
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "planner",
      label: "Planner",
      icon: <Calendar className="h-5 w-5" />,
      path: "/planner",
    },
    {
      id: "todo",
      label: "To-Do List",
      icon: <CheckSquare className="h-5 w-5" />,
      path: "/todo",
    },
    {
      id: "pomodoro",
      label: "Pomodoro",
      icon: <Clock className="h-5 w-5" />,
      path: "/pomodoro",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-purple-900/50 h-[70px] px-4 md:px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent"
        >
          <span className="mr-1">Study</span>
          <span className="relative">
            Blitz
            <motion.span
              className="absolute -top-1 -right-3 text-xs text-pink-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </span>
        </motion.div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link key={item.id} to={item.path}>
            <Button
              variant="ghost"
              className={cn(
                "relative group px-3 py-2 rounded-md transition-all duration-300",
                activeItem === item.id
                  ? "text-white bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                  : "text-gray-400 hover:text-white hover:bg-purple-900/10",
              )}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {activeItem === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 blur-sm group-hover:blur transition duration-500" />
            </Button>
          </Link>
        ))}

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative group p-2 rounded-full transition-all duration-300 text-gray-400 hover:text-white hover:bg-purple-900/10"
            >
              <Settings className="h-5 w-5" />
              <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 blur-sm group-hover:blur transition duration-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/90 border border-purple-900/50 backdrop-blur-md"
          >
            <DropdownMenuItem
              onClick={onToggleTheme}
              className="text-gray-300 hover:text-white hover:bg-purple-900/20 cursor-pointer flex items-center gap-2"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          className="relative group p-2 rounded-full transition-all duration-300 text-gray-400 hover:text-white hover:bg-purple-900/10"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 blur-sm group-hover:blur transition duration-500" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-[70px] left-0 right-0 bg-black/95 border-b border-purple-900/50 backdrop-blur-md py-4 px-4 md:hidden"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link key={item.id} to={item.path} onClick={toggleMobileMenu}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start relative group px-3 py-2 rounded-md transition-all duration-300",
                    activeItem === item.id
                      ? "text-white bg-gradient-to-r from-purple-900/20 to-pink-900/20"
                      : "text-gray-400 hover:text-white hover:bg-purple-900/10",
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {activeItem === item.id && (
                    <motion.div
                      layoutId="navbar-mobile-indicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-purple-900/10 px-3 py-2"
              onClick={() => {
                onToggleTheme();
                toggleMobileMenu();
              }}
            >
              <div className="flex items-center space-x-2">
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
