import React, { useState } from "react";
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

interface SettingsPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const themeOptions = [
  { value: "purple", label: "Neon Purple", color: "#b026ff" },
  { value: "blue", label: "Neon Blue", color: "#4d4dff" },
  { value: "pink", label: "Neon Pink", color: "#ff1493" },
  { value: "cyan", label: "Neon Cyan", color: "#00ffff" },
  { value: "green", label: "Neon Green", color: "#39ff14" },
];

const SettingsPanel = ({ open = true, onOpenChange }: SettingsPanelProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("purple");
  const [pomodoroLength, setPomodoroLength] = useState("25");
  const [shortBreakLength, setShortBreakLength] = useState("5");
  const [longBreakLength, setLongBreakLength] = useState("15");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-gray-800 text-white max-w-md w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
        </motion.div>

        <div className="relative z-10">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-center mb-2">
              <Settings className="h-8 w-8 text-purple-400 mr-2" />
              <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Settings
              </DialogTitle>
            </div>
          </DialogHeader>

          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-gray-800 border border-gray-700">
              <TabsTrigger
                value="appearance"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="timer"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400"
              >
                Timer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-purple-400 mr-2" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                    )}
                    <span>Dark Mode</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <label className="block mb-2">Theme Color</label>
                  <Select
                    value={selectedTheme}
                    onValueChange={setSelectedTheme}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {themeOptions.map((theme) => (
                        <SelectItem
                          key={theme.value}
                          value={theme.value}
                          className="focus:bg-gray-700 focus:text-white"
                        >
                          <div className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: theme.color }}
                            />
                            {theme.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((theme) => (
                      <motion.button
                        key={theme.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "p-2 rounded-md border border-gray-700 transition-all",
                          selectedTheme === theme.value
                            ? "ring-2 ring-offset-2 ring-offset-gray-900"
                            : "",
                        )}
                        style={{
                          boxShadow:
                            selectedTheme === theme.value
                              ? `0 0 10px ${theme.color}`
                              : "none",
                          borderColor: theme.color,
                        }}
                        onClick={() => setSelectedTheme(theme.value)}
                      >
                        <div
                          className="w-full h-8 rounded-md"
                          style={{ backgroundColor: theme.color, opacity: 0.8 }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="flex items-center">
                    {soundEnabled ? (
                      <Volume2 className="h-5 w-5 text-purple-400 mr-2" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-gray-400 mr-2" />
                    )}
                    <span>Sound Effects</span>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <div className="flex items-center">
                    {notificationsEnabled ? (
                      <Bell className="h-5 w-5 text-purple-400 mr-2" />
                    ) : (
                      <BellOff className="h-5 w-5 text-gray-400 mr-2" />
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
                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <label className="block mb-2">
                    Pomodoro Length (minutes)
                  </label>
                  <Select
                    value={pomodoroLength}
                    onValueChange={setPomodoroLength}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
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
                          className="focus:bg-gray-700 focus:text-white"
                        >
                          {value} minutes
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <label className="block mb-2">
                    Short Break Length (minutes)
                  </label>
                  <Select
                    value={shortBreakLength}
                    onValueChange={setShortBreakLength}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {["3", "4", "5", "6", "7", "8", "9", "10"].map(
                        (value) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="focus:bg-gray-700 focus:text-white"
                          >
                            {value} minutes
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <label className="block mb-2">
                    Long Break Length (minutes)
                  </label>
                  <Select
                    value={longBreakLength}
                    onValueChange={setLongBreakLength}
                  >
                    <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {["10", "15", "20", "25", "30"].map((value) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="focus:bg-gray-700 focus:text-white"
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
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
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
