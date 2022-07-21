import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState, FormEvent } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import axios from "axios";

const Register: NextPage = () => {
	const [input, setInput] = useState({
		email: "",
		password: "",
		username: "",
	});
	const [qrCode, setQrCode] = useState(null);
	const [token, setToken] = useState<string>();
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
	const onVerify = useCallback((token: string) => {
		setToken(token);
	}, []);
	const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInput((pre) => ({ ...pre, [e.target.name]: e.target.value }));
	}, []);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			setRefreshReCaptcha((r) => !r);
			const response = await axios.post("http://localhost:5000/user/register", {
				email: input.email,
				password: input.password,
				username: input.username,
			});
			setQrCode(response.data.qr);
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	return (
		<>
			<div className="container flex-center min-h-screen">
				<div className="max-w-md w-full rounded-md shadow-md border border-slate-200 mx-auto py-4">
					<h1 className="flex-center flex-col font-bold text-2xl uppercase">Register</h1>
					{qrCode ? (
						// eslint-disable-next-line @next/next/no-img-element
						<div className="flex-center flex-col p-4">
							<img className="w-full aspect-square" src={qrCode} alt="" />
							<Link href="/">
								<a className="w-full px-3 py-2 text-sm leading-tight text-white bg-red-400 hover:bg-red-300 transition-all rounded-md border border-slate-200 hover:border-slate-300 font-semibold uppercase text-center">
									Back to Home
								</a>
							</Link>
						</div>
					) : (
						<form className="p-4 flex-center flex-col gap-4" onSubmit={handleSubmit}>
							<div className="flex flex-col gap-1 w-full">
								<label className="text-sm text-gray-600 font-medium">Email</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-md border-gray-200 outline-none"
									type="email"
									placeholder="Email"
									name="email"
									value={input.email}
									onChange={handleChangeValue}
								/>
							</div>
							<div className="flex flex-col gap-1 w-full">
								<label className="text-sm text-gray-600 font-medium">Password</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-md border-gray-200 outline-none"
									type="password"
									placeholder="Password"
									name="password"
									value={input.password}
									onChange={handleChangeValue}
								/>
							</div>
							<div className="flex flex-col gap-1 w-full">
								<label className="text-sm text-gray-600 font-medium">Username</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-md border-gray-200 outline-none"
									type="text"
									placeholder="Username"
									name="username"
									value={input.username}
									onChange={handleChangeValue}
								/>
							</div>
							<GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
							<div className="flex flex-col gap-2 w-full">
								<button
									className="w-full px-3 py-2 text-sm leading-tight text-white bg-slate-600 hover:bg-slate-500 transition-all rounded-md border border-slate-200 hover:border-slate-300 font-semibold uppercase"
									type="submit"
								>
									Submit
								</button>
								<Link href="/">
									<a className="w-full px-3 py-2 text-sm leading-tight text-white bg-red-400 hover:bg-red-300 transition-all rounded-md border border-slate-200 hover:border-slate-300 font-semibold uppercase text-center">
										Back to Home
									</a>
								</Link>
							</div>
						</form>
					)}
				</div>
			</div>
		</>
	);
};

export default Register;
