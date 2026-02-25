import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { StatusBar } from "./StatusBar";
import "./device-frame.scss";

type DeviceFrameProps = {
	children: ReactNode;
};

export function DeviceFrame({ children }: DeviceFrameProps) {
	return (
		<div className="device-mockup">
			<div className="device-camera" aria-hidden="true" />
			<StatusBar />
			<div className="device-screen">{children}</div>
			<NavBar />
		</div>
	);
}
