import { ImSpinner2 } from "react-icons/im";

const ButtonLoader = ({ text = "Please wait..." }) => {
	return (
		<div className="flex items-center justify-center gap-2">
			<ImSpinner2 className="animate-spin text-lg" />
			<span className="font-medium">{text}</span>
		</div>
	);
};

export default ButtonLoader;
