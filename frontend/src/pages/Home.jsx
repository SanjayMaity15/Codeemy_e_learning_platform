import ReviewSlider from "../components/common/ReviewSlider";
import CodeBlocks from "../components/homePage/CodeBlocks";
import Faq from "../components/homePage/Faq";
import HeroSection from "../components/homePage/HeroSection";
import MeetWithOurMentors from "../components/homePage/MeetWithOurMentor";
import WhyChooseUs from "../components/homePage/WhyChooseUs";

const Home = () => {
	return (
		<div>
			<HeroSection />
			<CodeBlocks />
			<MeetWithOurMentors />
			<WhyChooseUs />
			<Faq />
			<ReviewSlider />
		</div>
	);
};

export default Home;
