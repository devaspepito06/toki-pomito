import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { CiSettings } from "react-icons/ci";

export const Navbar = () => {
  return (
    <div className="fixed top-1 bg-blue-700">
      {import.meta.env.MODE === "development" && (
        <Badge className="bg-gray-800 w-25 fixed top-3 left-34 text-white">
          Development
        </Badge>
      )}
      <Button className="group bg-transparent w-30 h-9 rounded-full fixed top-3 left-3 hover:bg-transparent hover:text-gray-500 hover:cursor-pointer">
        <Avatar className="rounded-full border-2 border-gray-400">
          <AvatarImage src="/img/logo.png" />
          <AvatarFallback>IDK</AvatarFallback>
        </Avatar>
        <p className="text-white transition-all duration-200">Toki Pomito</p>
      </Button>

      {import.meta.env.MODE === "development" && (
        <Button className="group bg-gray-800 w-10 fixed top-3 right-3 text-white hover:text-black">
          <CiSettings className="size-6 group-hover:text-black group-hover:cursor-pointer transition-colors duration-200" />
        </Button>
      )}
    </div>
  );
};
