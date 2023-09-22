import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/loading-dots";
import dummy from "./dummy.json";
import { MdCallEnd } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa";

const Nasabah = [
	{
		id: 1,
		name: "Rendra",
		phone: "081399817946",
		address: "Jl. Vue 3",
	},
	{
		id: 2,
		name: "Kristian",
		phone: "0812777238",
		address: "Jl. Go routine",
	},
	{
		id: 3,
		name: "Okta Ginting",
		phone: "08123433223",
		address: "Jl. Java 21",
	},
	{
		id: 4,
		name: "John Doe",
		phone: "08231332745",
		address: "Jl. React 18",
	},
];

export default function Home() {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [parentMessage, setParentMessage] = useState("");
	const [fromParent, setFromParent] = useState(false);

	const [callState, setCallState] = useState({
		phone: "",
		name: "",
	});

	// const opeartionOnDial = () => {
	//   setDisabled(true)
	//   window.parent.postMessage('Dial', 'http://localhost:3000')
	// }
	// const operationOnHangup = () => {
	//   setDisabled(false)
	//   window.parent.postMessage('Hangup', 'http://localhost:3000')
	// }

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.origin !== "http://localhost:3000") return;
			if (event.data == "From Parent") {
				setParentMessage(event.data);
				setDisabled(false);
				console.log("fromparent: ", event.data);
				//
			}

			if (event.data == "From Parent") window.parent.postMessage("Hangup", "http://localhost:3000");
		};
		window.addEventListener("message", handleMessage, false);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, [parentMessage]);

	return (
		<div className=" flex flex-col justify-between bg-white text-black border-2 border-black rounded-sm  m-10">
			<div className="flex justify-between p-4">
				<h1 className="text-2xl ">CRM Application</h1>
				<button className="border border-black rounded-md flex items-center justify-center h-8 w-8 px-2">x</button>
			</div>
			<div className="overflow-x-auto">
				<table className="table ">
					{/* head */}
					<thead className="text-slate-950 ">
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Address</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{Nasabah.map((nasabah, index) => (
							<tr key={index} onClick={() => setCallState({ ...callState, name: nasabah.name, phone: nasabah.phone })}>
								<th>{index + 1}</th>
								<td>{nasabah.name}</td>
								<td>{nasabah.address}</td>
								<td>{nasabah.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between py-4 px-20 gap-10 border-t-2 bg-[#F0F1F5]">
				<div>
					<p>
						Name : <span>{callState.name}</span>
					</p>
					<p>
						Phone : <span>{callState.phone}</span>
					</p>
				</div>
				<div className="flex  gap-x-2">
					<button
						// onClick={opeartionOnDial}
						disabled={disabled}
						className={`flex items-center justify-center bg-[#5AC493] w-24 text-white rounded-md ${
							disabled == true ? " cursor-not-allowed opacity-70" : ""
						}`}
					>
						{disabled ? (
							<span>
								Dialing <LoadingDots />
							</span>
						) : (
							"Dial"
						)}
					</button>
					<button
						// onClick={operationOnHangup}
						className="flex items-center justify-center bg-[#DC3939] w-24 text-white rounded-md"
					>
						Hangup
					</button>
				</div>
			</div>
		</div>
	);
}
