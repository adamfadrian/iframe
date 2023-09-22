import React from "react";
import LoadingDots from "@/components/loading-dots";

type ButtonDialProps = {
	operationOnDial: () => void;
	IsDisabled: boolean;
};

const ButtonDial = ({ operationOnDial, IsDisabled }: ButtonDialProps) => {
	return (
		<button
			onClick={operationOnDial}
			disabled={IsDisabled}
			className={` flex items-center justify-center bg-[#5AC493] w-24 h-8 text-white rounded-md ${
				IsDisabled == true ? " cursor-not-allowed opacity-70" : ""
			}`}
		>
			Dial
		</button>
	);
};

export default ButtonDial;
