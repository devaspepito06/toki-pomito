import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Hourglass } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "@/components/ui/label";

interface NavbarProps {
  focusTime: number;
  breakTime: number;
  setFocusTime: (value: number) => void;
  setBreakTime: (value: number) => void;
}

export const Navbar = ({
  focusTime,
  breakTime,
  setFocusTime,
  setBreakTime,
}: NavbarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="pt-4 pb-4 flex h-12 w-full flex-row items-center justify-between p-1">
        <div className="flex-row items-center gap-4 md:flex">
          <Button className="group bg-transparent w-30 h-9 rounded-full z-50 hover:bg-transparent hover:text-gray-500 hover:cursor-pointer">
            <Avatar className="rounded-full border-2 border-gray-400">
              <AvatarImage src="/img/logo.png" />
              <AvatarFallback>Toki Pomito Icon</AvatarFallback>
            </Avatar>
            <p className="text-white transition-all duration-200">
              Toki Pomito
            </p>
          </Button>
          {import.meta.env.MODE === "development" && (
            <Badge className="bg-gray-800 z-50 text-white">Development</Badge>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="group transition-colors duration-300 bg-transparent hover:bg-transparent w-10 z-50 text-gray-500 hover:text-white hover:cursor-pointer">
                <Hourglass
                  className={`transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`}
                />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Time Settings</DrawerTitle>
                  <DrawerDescription>
                    Set your focus and break times.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  {/* Focus Time */}
                  <div className="flex flex-col gap-1">
                    <FieldGroup>
                      <Field>
                        <Label>Focus Time (min)</Label>
                        <Input
                          type="number"
                          min={1}
                          max={120}
                          value={focusTime}
                          onChange={(e) => setFocusTime(Number(e.target.value))}
                        />
                      </Field>
                      <Field>
                        <Label className="text-gray-400 text-xs font-medium">
                          Break Time (min)
                        </Label>
                        <Input
                          type="number"
                          min={1}
                          max={60}
                          value={breakTime}
                          onChange={(e) => setBreakTime(Number(e.target.value))}
                        />
                      </Field>
                    </FieldGroup>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Overlay para cerrar el panel al hacer click fuera */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
};
