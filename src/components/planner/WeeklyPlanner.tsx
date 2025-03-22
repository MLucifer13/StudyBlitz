import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  day: string;
  time: string;
  color: string;
}

interface WeeklyPlannerProps {
  events?: Event[];
  onAddEvent?: (event: Omit<Event, "id">) => void;
  onEditEvent?: (event: Event) => void;
  onDeleteEvent?: (id: string) => void;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];
const COLOR_OPTIONS = [
  { value: "purple", label: "Purple" },
  { value: "blue", label: "Blue" },
  { value: "pink", label: "Pink" },
  { value: "green", label: "Green" },
];

const DEFAULT_EVENTS: Event[] = [
  {
    id: "1",
    title: "Math Study Group",
    description: "Review calculus problems with study group",
    day: "Monday",
    time: "3:00 PM",
    color: "purple",
  },
  {
    id: "2",
    title: "Physics Lab",
    description: "Complete lab assignment for Physics 101",
    day: "Wednesday",
    time: "1:00 PM",
    color: "blue",
  },
  {
    id: "3",
    title: "Essay Writing",
    description: "Work on English literature essay",
    day: "Thursday",
    time: "4:00 PM",
    color: "pink",
  },
];

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  events = DEFAULT_EVENTS,
  onAddEvent = () => {},
  onEditEvent = () => {},
  onDeleteEvent = () => {},
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    day: DAYS_OF_WEEK[0],
    time: TIME_SLOTS[0],
    color: "purple",
  });

  const handleAddEvent = () => {
    onAddEvent(newEvent);
    setNewEvent({
      title: "",
      description: "",
      day: DAYS_OF_WEEK[0],
      time: TIME_SLOTS[0],
      color: "purple",
    });
    setIsAddEventOpen(false);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      onEditEvent(selectedEvent);
      setSelectedEvent(null);
      setIsEditEventOpen(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    onDeleteEvent(id);
    setSelectedEvent(null);
    setIsEditEventOpen(false);
  };

  const getEventsByDay = (day: string) => {
    return events.filter((event) => event.day === day);
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-purple-950 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]";
      case "blue":
        return "bg-blue-950 border-blue-500 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]";
      case "pink":
        return "bg-pink-950 border-pink-500 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.5)]";
      case "green":
        return "bg-green-950 border-green-500 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
      default:
        return "bg-purple-950 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]";
    }
  };

  return (
    <Card className="w-full h-full bg-gray-950 border-gray-800 text-white overflow-hidden">
      <CardHeader className="bg-gray-900 border-b border-gray-800 flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
          Weekly Planner
        </CardTitle>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-purple-400">
                Add New Event
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="day" className="text-white">
                    Day
                  </Label>
                  <Select
                    value={newEvent.day}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, day: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {DAYS_OF_WEEK.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time" className="text-white">
                    Time
                  </Label>
                  <Select
                    value={newEvent.time}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, time: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color" className="text-white">
                  Color
                </Label>
                <Select
                  value={newEvent.color}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, color: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {COLOR_OPTIONS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddEvent}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0 overflow-auto max-h-[calc(100%-80px)]">
        <div className="grid grid-cols-7 bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-medium text-gray-300"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 p-2 bg-gray-950">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="min-h-[400px] border border-gray-800 rounded-md p-2"
            >
              {getEventsByDay(day).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "mb-2 p-2 rounded-md border text-sm relative transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                    getColorClass(event.color),
                  )}
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsEditEventOpen(true);
                  }}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs opacity-80 flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>

      {/* Edit Event Dialog */}
      <Dialog
        open={isEditEventOpen && selectedEvent !== null}
        onOpenChange={setIsEditEventOpen}
      >
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-blue-400">
              Edit Event
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title" className="text-white">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={selectedEvent.title}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-day" className="text-white">
                    Day
                  </Label>
                  <Select
                    value={selectedEvent.day}
                    onValueChange={(value) =>
                      setSelectedEvent({ ...selectedEvent, day: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {DAYS_OF_WEEK.map((day) => (
                        <SelectItem key={`edit-${day}`} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-time" className="text-white">
                    Time
                  </Label>
                  <Select
                    value={selectedEvent.time}
                    onValueChange={(value) =>
                      setSelectedEvent({ ...selectedEvent, time: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={`edit-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-color" className="text-white">
                  Color
                </Label>
                <Select
                  value={selectedEvent.color}
                  onValueChange={(value) =>
                    setSelectedEvent({ ...selectedEvent, color: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {COLOR_OPTIONS.map((color) => (
                      <SelectItem
                        key={`edit-${color.value}`}
                        value={color.value}
                      >
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() =>
                selectedEvent && handleDeleteEvent(selectedEvent.id)
              }
              className="bg-red-900 hover:bg-red-800 text-white border-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleEditEvent}
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WeeklyPlanner;
