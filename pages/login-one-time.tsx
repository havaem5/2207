import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState, FormEvent } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const Login: NextPage = () => {
	const [input, setInput] = useState({
		email: "",
		token: "",
	});
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
			const response = await axios.post("http://localhost:5000/user/verify-token", {
				email: input.email,
				token: input.token,
			});
			alert("Success");
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	return (
		<>
			<div className="container flex-center min-h-screen">
				<div className="max-w-md w-full rounded-md shadow-md border border-slate-200 mx-auto py-4">
					<h1 className="flex-center flex-col font-bold text-2xl uppercase">Login One Time</h1>
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
							<label className="text-sm text-gray-600 font-medium">Token</label>
							<input
								className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-md border-gray-200 outline-none"
								type="text"
								placeholder="Token"
								name="token"
								value={input.token}
								onChange={handleChangeValue}
							/>
						</div>
						<GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
						<div className="flex flex-col gap-2 w-full">
							<button
								className="w-full px-3 py-2 text-sm leading-tight text-white bg-slate-600 hover:bg-slate-500 transition-all rounded-md border border-slate-200 hover:border-slate-300 font-semibold uppercase"
								type="submit"
							>
								Login
							</button>
							<Link href="/">
								<a className="w-full px-3 py-2 text-sm leading-tight text-white bg-red-400 hover:bg-red-300 transition-all rounded-md border border-slate-200 hover:border-slate-300 font-semibold uppercase text-center">
									Back to Home
								</a>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
