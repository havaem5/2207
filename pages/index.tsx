import Link from "next/link";

interface Props {}

export default function Home(props: Props) {
	return (
		<div className="container flex-center min-h-screen">
			<div className="max-w-md w-full rounded-md shadow-md border border-slate-200 mx-auto p-4 space-y-2">
				<Link href="/login">
					<a className="block text-center bg-slate-100 uppercase font-medium p-2 hover:bg-slate-200 border-slate-200 rounded-md text-slate-700">
						Login
					</a>
				</Link>
				<Link href="/login-one-time">
					<a className="block text-center bg-slate-100 uppercase font-medium p-2 hover:bg-slate-200 border-slate-200 rounded-md text-slate-700">
						Login OTP
					</a>
				</Link>
				<Link href="/register">
					<a className="block text-center bg-slate-100 uppercase font-medium p-2 hover:bg-slate-200 border-slate-200 rounded-md text-slate-700">
						Register
					</a>
				</Link>
			</div>
		</div>
	);
}
