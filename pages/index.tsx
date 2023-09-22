import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import dummy from "./dummy.json";
import { MdCallEnd } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa";
import ButtonDial from "@/components/ButtonDial";
import BUttonHangUp from "@/components/BUttonHangUp";

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
	const [IsDisabled, setIsDisabled] = useState<boolean>(false);
	const [parentMessage, setParentMessage] = useState("");
	const [fromParent, setFromParent] = useState(false);

	const [callState, setCallState] = useState({
		type: "Dial",
		phone: "",
		name: "",
	});
	console.log(callState);

	const operationOnDial = (nasabah: any) => {
		setCallState({ ...callState, name: nasabah.name, phone: nasabah.phone, type: "Dial" });
		// setIsDisabled(true);
		window.parent.postMessage(callState, "http://localhost:3000");
	};
	const operationOnHangup = () => {
		setIsDisabled(false);
		window.parent.postMessage("Hangup", "http://localhost:3000");
	};

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.origin !== "http://localhost:3000") return;
			if (event.data == "From Parent") {
				setParentMessage(event.data);
				setIsDisabled(false);
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
				<button
					className="border border-black bg-gray-200 text-2xl font-medium rounded-md flex items-center justify-center h-8 w-8 px-2"
					onClick={() => setCallState({ name: "", phone: "", type: "Dial" })}
				>
					x
				</button>
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
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{Nasabah.map((nasabah) => (
							<tr key={nasabah.id} className="hover:cursor-pointer hover:bg-gray-100">
								<th>{nasabah.id}</th>
								<td>{nasabah.name}</td>
								<td>{nasabah.address}</td>
								<td>{nasabah.phone}</td>
								<td className="flex  gap-x-2 items-center">
									<ButtonDial IsDisabled={IsDisabled} operationOnDial={() => operationOnDial(nasabah)} />
									<BUttonHangUp operationOnHangup={operationOnHangup} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between py-4 px-20 gap-10 border-t-2 bg-[#F0F1F5]">
				{callState.name != "" ? (
					<div>
						<p>
							Name : <span>{callState.name}</span>
						</p>
						<p>
							Phone : <span>{callState.phone}</span>
						</p>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
