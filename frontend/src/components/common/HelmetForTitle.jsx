import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo.png"

const PageTitle = ({ title }) => (
	<Helmet>
		<title>{title ? `${title}` : "Codeemy | Home"}</title>

		{/* 🔥 Keep favicon persistent */}
		<link rel="icon" href={logo} />
	</Helmet>
);

export default PageTitle;
