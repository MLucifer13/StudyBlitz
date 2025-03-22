import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PomodoroTimerProps {
  initialFocusTime?: number;
  initialBreakTime?: number;
  initialLongBreakTime?: number;
  initialCycles?: number;
  onTimerComplete?: () => void;
  className?: string;
}

const PomodoroTimer = ({
  initialFocusTime = 25,
  initialBreakTime = 5,
  initialLongBreakTime = 15,
  initialCycles = 4,
  onTimerComplete = () => {},
  className,
}: PomodoroTimerProps) => {
  // Timer states
  const [focusTime, setFocusTime] = useState(initialFocusTime);
  const [breakTime, setBreakTime] = useState(initialBreakTime);
  const [longBreakTime, setLongBreakTime] = useState(initialLongBreakTime);
  const [cycles, setCycles] = useState(initialCycles);

  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break" | "longBreak">("focus");
  const [currentCycle, setCurrentCycle] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3",
    );
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer completed
            clearInterval(timerRef.current!);
            if (audioRef.current) {
              audioRef.current.play();
            }
            onTimerComplete();

            // Determine next mode
            if (mode === "focus") {
              if (currentCycle % cycles === 0) {
                setMode("longBreak");
                setTimeLeft(longBreakTime * 60);
              } else {
                setMode("break");
                setTimeLeft(breakTime * 60);
              }
              setCurrentCycle((prev) => prev + 1);
            } else {
              setMode("focus");
              setTimeLeft(focusTime * 60);
            }

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isRunning,
    mode,
    currentCycle,
    cycles,
    focusTime,
    breakTime,
    longBreakTime,
    onTimerComplete,
  ]);

  // Reset timer when mode changes
  useEffect(() => {
    if (mode === "focus") {
      setTimeLeft(focusTime * 60);
    } else if (mode === "break") {
      setTimeLeft(breakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  }, [focusTime, breakTime, longBreakTime, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setCurrentCycle(1);
    setTimeLeft(focusTime * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    const totalSeconds =
      mode === "focus"
        ? focusTime * 60
        : mode === "break"
          ? breakTime * 60
          : longBreakTime * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  // Get color based on current mode
  const getModeColor = () => {
    switch (mode) {
      case "focus":
        return "from-purple-500 to-blue-500";
      case "break":
        return "from-green-400 to-cyan-500";
      case "longBreak":
        return "from-pink-500 to-purple-500";
      default:
        return "from-purple-500 to-blue-500";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-xl bg-black/90 border border-gray-800",
        className,
      )}
    >
      {/* Timer Display */}
      <div className="relative w-64 h-64 mb-6">
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-800 opacity-30" />

        {/* Progress Circle */}
        <svg
          className="absolute inset-0 w-full h-full rotate-[-90deg]"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            strokeWidth="4"
            stroke={`url(#${mode}Gradient)`}
            strokeDasharray="289.02652413026095"
            strokeDashoffset={
              289.02652413026095 - (289.02652413026095 * getProgress()) / 100
            }
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            initial={{ strokeDashoffset: 289.02652413026095 }}
            animate={{
              strokeDashoffset:
                289.02652413026095 - (289.02652413026095 * getProgress()) / 100,
            }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient
              id="focusGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="breakGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient
              id="longBreakGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className={`text-5xl font-bold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]`}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          <div className="mt-2 text-sm font-medium uppercase tracking-wider text-gray-400">
            {mode === "focus"
              ? "Focus Time"
              : mode === "break"
                ? "Short Break"
                : "Long Break"}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Cycle {currentCycle} of {cycles}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <Button
          onClick={toggleTimer}
          size="lg"
          className={`rounded-full w-14 h-14 ${isRunning ? "bg-pink-600 hover:bg-pink-700" : "bg-purple-600 hover:bg-purple-700"} shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300`}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </Button>
        <Button
          onClick={resetTimer}
          size="icon"
          variant="outline"
          className="rounded-full w-10 h-10 border-gray-700 bg-gray-900 hover:bg-gray-800 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          size="icon"
          variant="outline"
          className="rounded-full w-10 h-10 border-gray-700 bg-gray-900 hover:bg-gray-800 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => {
            setMode("focus");
            setIsRunning(false);
          }}
          variant={mode === "focus" ? "default" : "outline"}
          size="sm"
          className={`${mode === "focus" ? "bg-purple-600 hover:bg-purple-700 shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "border-gray-700 bg-gray-900 hover:bg-gray-800"}`}
        >
          Focus
        </Button>
        <Button
          onClick={() => {
            setMode("break");
            setIsRunning(false);
          }}
          variant={mode === "break" ? "default" : "outline"}
          size="sm"
          className={`${mode === "break" ? "bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "border-gray-700 bg-gray-900 hover:bg-gray-800"}`}
        >
          Break
        </Button>
        <Button
          onClick={() => {
            setMode("longBreak");
            setIsRunning(false);
          }}
          variant={mode === "longBreak" ? "default" : "outline"}
          size="sm"
          className={`${mode === "longBreak" ? "bg-pink-600 hover:bg-pink-700 shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "border-gray-700 bg-gray-900 hover:bg-gray-800"}`}
        >
          Long Break
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          className="w-full p-4 rounded-lg bg-gray-900/80 border border-gray-800 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-sm font-medium text-gray-300 mb-4">
            Timer Settings
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">
                Focus Time (minutes): {focusTime}
              </label>
              <Slider
                value={[focusTime]}
                min={5}
                max={60}
                step={5}
                onValueChange={(value) => setFocusTime(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">
                Break Time (minutes): {breakTime}
              </label>
              <Slider
                value={[breakTime]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setBreakTime(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">
                Long Break Time (minutes): {longBreakTime}
              </label>
              <Slider
                value={[longBreakTime]}
                min={5}
                max={60}
                step={5}
                onValueChange={(value) => setLongBreakTime(value[0])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">
                Cycles before Long Break
              </label>
              <Select
                value={cycles.toString()}
                onValueChange={(value) => setCycles(parseInt(value))}
              >
                <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select cycles" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} cycles
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PomodoroTimer;
