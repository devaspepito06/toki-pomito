import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { CiSettings } from "react-icons/ci";

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
			{/* Barra superior */}
			<div className="fixed top-0 left-0 right-0 h-14 z-40" />

			{/* Logo */}
			<Button className="group bg-transparent w-30 h-9 rounded-full fixed top-3 left-3 z-50 hover:bg-transparent hover:text-gray-500 hover:cursor-pointer">
				<Avatar className="rounded-full border-2 border-gray-400">
					<AvatarImage src="/img/logo.png" />
					<AvatarFallback>Toki Pomito Icon</AvatarFallback>
				</Avatar>
				<p className="text-white transition-all duration-200">Toki Pomito</p>
			</Button>

			{/* Badge de desarrollo */}
			{import.meta.env.MODE === "development" && (
				<Badge className="bg-gray-800 w-25 fixed top-3 left-34 z-50 text-white">
					Development
				</Badge>
			)}

			{/* Botón de settings */}
			<Button
				className="group bg-gray-800 w-10 fixed top-3 right-3 z-50 text-white hover:bg-gray-700 hover:cursor-pointer"
				onClick={() => setSettingsOpen((prev) => !prev)}
			>
				<CiSettings
					className={`size-6 transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`}
				/>
			</Button>

			{/* Panel de settings */}
			<div
				className={`
          fixed top-14 right-3 z-50 w-64
          bg-gray-900 border border-gray-700 rounded-xl shadow-2xl
          transition-all duration-300 ease-in-out overflow-hidden
          ${settingsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
			>
				<div className="p-4 flex flex-col gap-4">
					<h2 className="text-white font-semibold text-sm tracking-widest uppercase">
						Settings
					</h2>

					{/* Focus Time */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-400 text-xs font-medium">
							Focus Time (min)
						</label>
						<input
							type="number"
							min={1}
							max={120}
							value={focusTime}
							onChange={(e) => setFocusTime(Number(e.target.value))}
							className="
                w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2
                border border-gray-700 focus:outline-none focus:border-gray-500
                transition-colors duration-200
              "
						/>
					</div>

					{/* Break Time */}
					<div className="flex flex-col gap-1">
						<label className="text-gray-400 text-xs font-medium">
							Break Time (min)
						</label>
						<input
							type="number"
							min={1}
							max={60}
							value={breakTime}
							onChange={(e) => setBreakTime(Number(e.target.value))}
							className="
                w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2
                border border-gray-700 focus:outline-none focus:border-gray-500
                transition-colors duration-200
              "
						/>
					</div>

					<p className="text-gray-600 text-xs">
						The changes will be applied on the next startup or reset.
					</p>
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
