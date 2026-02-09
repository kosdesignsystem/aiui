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
			<div className="device-side device-side-left" aria-hidden="true">
				<span />
			</div>
			<div className="device-side device-side-right" aria-hidden="true">
				<span />
				<span />
			</div>
			<div className="device-screen">
				<StatusBar />
				<div className="device-content">{children}</div>
				<NavBar />
			</div>
		</div>
	);
}
