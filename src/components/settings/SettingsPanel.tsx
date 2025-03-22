import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AppTheme } from "@/components/dashboard/DashboardLayout";

interface SettingsPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

const themeOptions = [
  { value: "purple", label: "Neon Purple", color: "#b026ff" },
  { value: "blue", label: "Neon Blue", color: "#4d4dff" },
  { value: "pink", label: "Neon Pink", color: "#ff1493" },
  { value: "cyan", label: "Neon Cyan", color: "#00ffff" },
  { value: "green", label: "Neon Green", color: "#39ff14" },
];

const SettingsPanel = ({
  open = true,
  onOpenChange,
  theme = "dark",
  onThemeChange = () => {},
}: SettingsPanelProps) => {
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("purple");
  const [pomodoroLength, setPomodoroLength] = useState("25");
  const [shortBreakLength, setShortBreakLength] = useState("5");
  const [longBreakLength, setLongBreakLength] = useState("15");

  // Update darkMode when theme prop changes
  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    onThemeChange(checked ? "dark" : "light");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-md w-full overflow-hidden",
          theme === "dark"
            ? "bg-gray-900 border border-gray-800 text-white"
            : "bg-white border border-gray-200 text-gray-900 shadow-lg",
        )}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "absolute inset-0 z-0 overflow-hidden",
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 to-black"
              : "bg-gradient-to-br from-gray-50 to-white",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent",
              theme === "dark" ? "opacity-20" : "opacity-10",
            )}
          ></div>
        </motion.div>

        <div className="relative z-10">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-center mb-2">
              <Settings
                className={cn(
                  "h-8 w-8 mr-2",
                  theme === "dark" ? "text-purple-400" : "text-purple-600",
                )}
              />
              <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Settings
              </DialogTitle>
            </div>
          </DialogHeader>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList
              className={cn(
                "w-full grid grid-cols-3",
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-gray-100 border border-gray-200",
              )}
            >
              <TabsTrigger
                value="appearance"
                className={cn(
                  theme === "dark"
                    ? "data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-purple-600",
                )}
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className={cn(
                  theme === "dark"
                    ? "data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-purple-600",
                )}
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="timer"
                className={cn(
                  theme === "dark"
                    ? "data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-purple-600",
                )}
              >
                Timer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-purple-400 mr-2" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                    )}
                    <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <label className="block mb-2">Theme Color</label>
                  <Select
                    value={selectedTheme}
                    onValueChange={setSelectedTheme}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200",
                      )}
                    >
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent
                      className={cn(
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200",
                      )}
                    >
                      {themeOptions.map((themeOption) => (
                        <SelectItem
                          key={themeOption.value}
                          value={themeOption.value}
                          className={cn(
                            theme === "dark"
                              ? "focus:bg-gray-700 focus:text-white"
                              : "focus:bg-gray-100 focus:text-gray-900",
                          )}
                        >
                          <div className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: themeOption.color }}
                            />
                            {themeOption.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((themeOption) => (
                      <motion.button
                        key={themeOption.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "p-2 rounded-md transition-all",
                          theme === "dark"
                            ? "border border-gray-700"
                            : "border border-gray-200",
                          selectedTheme === themeOption.value
                            ? theme === "dark"
                              ? "ring-2 ring-offset-2 ring-offset-gray-900"
                              : "ring-2 ring-offset-2 ring-offset-white"
                            : "",
                        )}
                        style={{
                          boxShadow:
                            selectedTheme === themeOption.value
                              ? `0 0 10px ${themeOption.color}`
                              : "none",
                          borderColor: themeOption.color,
                        }}
                        onClick={() => setSelectedTheme(themeOption.value)}
                      >
                        <div
                          className="w-full h-8 rounded-md"
                          style={{
                            backgroundColor: themeOption.color,
                            opacity: 0.8,
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <div className="flex items-center">
                    {soundEnabled ? (
                      <Volume2
                        className={cn(
                          "h-5 w-5 mr-2",
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600",
                        )}
                      />
                    ) : (
                      <VolumeX
                        className={cn(
                          "h-5 w-5 mr-2",
                          theme === "dark" ? "text-gray-400" : "text-gray-500",
                        )}
                      />
                    )}
                    <span>Sound Effects</span>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <div className="flex items-center">
                    {notificationsEnabled ? (
                      <Bell
                        className={cn(
                          "h-5 w-5 mr-2",
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600",
                        )}
                      />
                    ) : (
                      <BellOff
                        className={cn(
                          "h-5 w-5 mr-2",
                          theme === "dark" ? "text-gray-400" : "text-gray-500",
                        )}
                      />
                    )}
                    <span>Notifications</span>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timer" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <label className="block mb-2">
                    Pomodoro Length (minutes)
                  </label>
                  <Select
                    value={pomodoroLength}
                    onValueChange={setPomodoroLength}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200",
                      )}
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent
                      className={cn(
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200",
                      )}
                    >
                      {[
                        "15",
                        "20",
                        "25",
                        "30",
                        "35",
                        "40",
                        "45",
                        "50",
                        "55",
                        "60",
                      ].map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className={cn(
                            theme === "dark"
                              ? "focus:bg-gray-700 focus:text-white"
                              : "focus:bg-gray-100 focus:text-gray-900",
                          )}
                        >
                          {value} minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <label className="block mb-2">
                    Short Break Length (minutes)
                  </label>
                  <Select
                    value={shortBreakLength}
                    onValueChange={setShortBreakLength}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200",
                      )}
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent
                      className={cn(
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200",
                      )}
                    >
                      {["3", "4", "5", "6", "7", "8", "9", "10"].map(
                        (value) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className={cn(
                              theme === "dark"
                                ? "focus:bg-gray-700 focus:text-white"
                                : "focus:bg-gray-100 focus:text-gray-900",
                            )}
                          >
                            {value} minutes
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg",
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200 shadow-sm",
                  )}
                >
                  <label className="block mb-2">
                    Long Break Length (minutes)
                  </label>
                  <Select
                    value={longBreakLength}
                    onValueChange={setLongBreakLength}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200",
                      )}
                    >
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent
                      className={cn(
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200",
                      )}
                    >
                      {["10", "15", "20", "25", "30"].map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className={cn(
                            theme === "dark"
                              ? "focus:bg-gray-700 focus:text-white"
                              : "focus:bg-gray-100 focus:text-gray-900",
                          )}
                        >
                          {value} minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              className={cn(
                theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              Cancel
            </Button>
            <Button
              onClick={() => onOpenChange?.(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;
