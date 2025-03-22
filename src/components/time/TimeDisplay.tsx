import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  className?: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Clock className="h-5 w-5 text-purple-400 mr-2" />
      <div>
        <motion.div
          key={formatTime(currentTime)}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-medium text-white"
        >
          {formatTime(currentTime)}
        </motion.div>
        <div className="text-xs text-gray-400">{getGreeting()}</div>
      </div>
    </div>
  );
};

export default TimeDisplay;
