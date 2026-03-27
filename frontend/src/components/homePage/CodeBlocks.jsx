import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.profile);

	return (
		<div className={`max-w-7xl mx-auto`}>
			<div className="pt-12">
				<div className="flex flex-col md:flex-row">
					{/*Section 1*/}
					<div className="text-pink-600  flex-1  rounded-md px-4 py-16 flex flex-col items-start gap-5 ">
						<h1 className="text-3xl font-semibold font-orbitron">
							Empowering you with practical coding skills through
							online education.
						</h1>
						<p className="w-[80%] text-neutral-500">
							Our courses are designed and taught by industry
							experts who have years of experience in coding and
							are passionate about sharing their knowledge with
							you
						</p>
						<button
							className="font-orbitron px-10 py-3 rounded-full shadow-sm border border-indigo-800 bg-primary text-white hover:border-green-400   font-semibold hover:opacity-90 transition cursor-pointer"
							onClick={() =>
								navigate(user? "/courses" : "/login")
							}
						>
							Let's Start
						</button>
					</div>
					{/*Section 2*/}
					<div className=" h-fit  relative flex flex-row text-10[px] w-full pt-16 flex-1 ">
						{/*HW -> BG gradient*/}
						<div className="absolute top-30 left-35 w-36 h-36 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-pulse z-0" />

						<div className="text-center flex flex-col w-[10%] bg-linear-to-b from-pink-600 via-green-600 to-indigo-600 bg-clip-text text-transparent font-inter font-bold">
							<p>1</p>
							<p>2</p>
							<p>3</p>
							<p>4</p>
							<p>5</p>
							<p>6</p>
							<p>7</p>
							<p>8</p>
							<p>9</p>
							<p>10</p>
							<p>11</p>
							<p>12</p>
							<p>13</p>
							<p>14</p>
							<p>15</p>
						</div>

						<div
							className={`w-[90%] flex flex-col gap-2 font-bold font-mono bg-linear-to-b from-pink-600 via-green-400 to-indigo-600 bg-clip-text text-transparent pr-2`}
						>
							<TypeAnimation
								sequence={[
									`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<link rel="icon" type="image/svg+xml" href="/vite.svg" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Learn HTML</title>\n</head>\n<body>\n<h1 id="root">Hello World!</h1>\n<script type="module" src="script.js"></script>\n</body>\n</html>\n`,
									2000,
									"",
								]}
								repeat={Infinity}
								cursor={true}
								style={{
									whiteSpace: "pre-line",
									display: "block",
								}}
								omitDeletionAnimation={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CodeBlocks;
