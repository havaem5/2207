import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState, FormEvent } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Login: NextPage = () => {
	const [input, setInput] = useState({
		email: "",
		password: "",
		token: "",
	});
	const [isLogin, setIsLogin] = useState(false);
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
			if (!isLogin && token) {
				const response = await axios.post(`${process.env.API_URL}/user/login`, {
					email: input.email,
					password: input.password,
					token,
				});
				setIsLogin(true);
			} else {
				const response = await axios.post(`${process.env.API_URL}/user/verify-token`, {
					email: input.email,
					token: input.token,
				});
				alert("Success");
			}
		} catch (error: any) {
			console.log("error: ", error);
			// alert(error.response.data.message);
		}
		setRefreshReCaptcha((r) => !r);
	};

	return (
		<>
			<div className="container min-h-screen flex-center">
				<div className="w-full max-w-md py-4 mx-auto border rounded-md shadow-md border-slate-200">
					<h1 className="flex-col text-2xl font-bold flex-center">LOGIN</h1>
					<form className="flex-col gap-4 p-4 flex-center" onSubmit={handleSubmit}>
						{!isLogin ? (
							<>
								<div className="flex flex-col w-full gap-1">
									<label className="text-sm font-medium text-gray-600">Email</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-200 rounded-md outline-none"
										type="email"
										placeholder="Email"
										name="email"
										value={input.email}
										onChange={handleChangeValue}
									/>
								</div>
								<div className="flex flex-col w-full gap-1">
									<label className="text-sm font-medium text-gray-600">Password</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-200 rounded-md outline-none"
										type="password"
										placeholder="Password"
										name="password"
										value={input.password}
										onChange={handleChangeValue}
									/>
								</div>
							</>
						) : (
							<div className="flex flex-col w-full gap-1">
								<label className="text-sm font-medium text-gray-600">Token</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-200 rounded-md outline-none"
									type="text"
									placeholder="Token"
									name="token"
									value={input.token}
									onChange={handleChangeValue}
								/>
							</div>
						)}
						<GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
						<div className="flex flex-col w-full gap-2">
							<button
								className="w-full px-3 py-2 text-sm font-semibold leading-tight text-white uppercase transition-all border rounded-md bg-slate-600 hover:bg-slate-500 border-slate-200 hover:border-slate-300"
								type="submit"
							>
								Login
							</button>
							<Link href="/">
								<a className="w-full px-3 py-2 text-sm font-semibold leading-tight text-center text-white uppercase transition-all bg-red-400 border rounded-md hover:bg-red-300 border-slate-200 hover:border-slate-300">
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
