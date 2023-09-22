import React from "react";

const BUttonHangUp = ({ operationOnHangup }: { operationOnHangup: () => void }) => {
	return (
		<button
			onClick={operationOnHangup}
			className="flex items-center justify-center bg-[#DC3939] w-24 h-8 text-white rounded-md"
		>
			Hangup
		</button>
	);
};

export default BUttonHangUp;
