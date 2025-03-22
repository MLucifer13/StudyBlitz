import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Settings, LayoutGrid, Moon, Sun } from "lucide-react";
import WeeklyPlanner from "@/components/planner/WeeklyPlanner";
import TodoList from "@/components/todo/TodoList";
import PomodoroTimer from "@/components/pomodoro/PomodoroTimer";
import TimeDisplay from "@/components/time/TimeDisplay";
import AIAssistant from "@/components/ai/AIAssistant";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardLayoutProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showAllTools?: boolean;
}

export type ColorTheme = "purple" | "blue" | "pink";
export type AppTheme = "dark" | "light";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab = "all",
  onTabChange = () => {},
  showAllTools = true,
}) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("purple");
  const [appTheme, setAppTheme] = useState<AppTheme>("dark");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Theme color classes
  const themeColors = {
    purple: {
      primary: "from-purple-500 to-indigo-600",
      secondary: "from-purple-400 to-indigo-500",
      accent: "purple-500",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    },
    blue: {
      primary: "from-blue-500 to-cyan-600",
      secondary: "from-blue-400 to-cyan-500",
      accent: "blue-500",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    },
    pink: {
      primary: "from-pink-500 to-purple-600",
      secondary: "from-pink-400 to-purple-500",
      accent: "pink-500",
      glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    },
  };

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (appTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [appTheme]);

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
  };

  const toggleTheme = () => {
    setAppTheme(appTheme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        appTheme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-gray-50 text-gray-900",
      )}
    >
      {/* Top Bar with Time and Controls */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 backdrop-blur-md px-4 py-3 z-50 flex justify-between items-center",
          appTheme === "dark"
            ? "bg-black/80 border-b border-gray-800"
            : "bg-white/80 border-b border-gray-200 shadow-sm",
        )}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
          <TimeDisplay theme={appTheme} />
        </div>

        <div className="flex items-center space-x-3">
          <AIAssistant
            enabled={aiEnabled}
            onToggle={toggleAI}
            className="relative"
          />

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "rounded-full w-8 h-8 border-2",
              appTheme === "dark"
                ? "border-yellow-400 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                : "border-indigo-400 bg-indigo-500/20 text-indigo-500 hover:bg-indigo-500/30",
            )}
          >
            {appTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Color Theme Selector */}
          <div className="flex space-x-2">
            {Object.keys(themeColors).map((color) => (
              <Button
                key={color}
                size="icon"
                variant="outline"
                className={cn(
                  "w-8 h-8 rounded-full border-2",
                  `border-${color === "purple" ? "purple" : color === "blue" ? "blue" : "pink"}-500`,
                  `bg-${color === "purple" ? "purple" : color === "blue" ? "blue" : "pink"}-500/20`,
                  colorTheme === color &&
                    themeColors[colorTheme as keyof typeof themeColors].glow,
                )}
                onClick={() => setColorTheme(color as ColorTheme)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(true)}
            className={cn(
              "rounded-full w-8 h-8 border-2",
              appTheme === "dark"
                ? "border-gray-700 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
                : "border-gray-300 bg-gray-200/50 text-gray-600 hover:text-gray-900 hover:bg-gray-300/50",
            )}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-20">
        <motion.h1
          className={cn(
            "text-4xl font-bold text-center mb-8 bg-gradient-to-r bg-clip-text text-transparent",
            themeColors[colorTheme].primary,
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          StudyBlitz Dashboard
        </motion.h1>

        {/* Dashboard Tabs */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={onTabChange}
          className="w-full mb-8"
        >
          <TabsList
            className={cn(
              "grid w-full max-w-md mx-auto grid-cols-4",
              appTheme === "dark"
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200 shadow-sm",
            )}
          >
            <TabsTrigger
              value="all"
              className={cn(
                "data-[state=active]:bg-gradient-to-r",
                `data-[state=active]:${themeColors[colorTheme].primary}`,
                "data-[state=active]:text-white",
              )}
            >
              <LayoutGrid className="w-5 h-5 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger
              value="planner"
              className={cn(
                "data-[state=active]:bg-gradient-to-r",
                `data-[state=active]:${themeColors[colorTheme].primary}`,
                "data-[state=active]:text-white",
              )}
            >
              Planner
            </TabsTrigger>
            <TabsTrigger
              value="todo"
              className={cn(
                "data-[state=active]:bg-gradient-to-r",
                `data-[state=active]:${themeColors[colorTheme].primary}`,
                "data-[state=active]:text-white",
              )}
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="pomodoro"
              className={cn(
                "data-[state=active]:bg-gradient-to-r",
                `data-[state=active]:${themeColors[colorTheme].primary}`,
                "data-[state=active]:text-white",
              )}
            >
              Timer
            </TabsTrigger>
          </TabsList>

          {/* All Tools View */}
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <WeeklyPlanner theme={appTheme} />
              </motion.div>
              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <TodoList theme={appTheme} />
                <PomodoroTimer theme={appTheme} />
              </motion.div>
            </div>
          </TabsContent>

          {/* Individual Tool Views */}
          <TabsContent value="planner" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <WeeklyPlanner theme={appTheme} />
            </motion.div>
          </TabsContent>

          <TabsContent value="todo" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <TodoList theme={appTheme} />
            </motion.div>
          </TabsContent>

          <TabsContent value="pomodoro" className="mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <PomodoroTimer theme={appTheme} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        open={showSettings}
        onOpenChange={setShowSettings}
        theme={appTheme}
        onThemeChange={setAppTheme}
      />

      {/* Glowing Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div
          className={cn(
            "absolute top-20 left-20 w-64 h-64 rounded-full blur-[100px] bg-gradient-to-r",
            themeColors[colorTheme].primary,
            appTheme === "dark" ? "opacity-20" : "opacity-10",
          )}
        />
        <div
          className={cn(
            "absolute bottom-20 right-20 w-80 h-80 rounded-full blur-[120px] bg-gradient-to-r",
            themeColors[colorTheme].secondary,
            appTheme === "dark" ? "opacity-20" : "opacity-10",
          )}
        />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] bg-gradient-to-r",
            themeColors[colorTheme].primary,
            appTheme === "dark" ? "opacity-10" : "opacity-5",
          )}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
