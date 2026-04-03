import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnim = (ref, options = {}, deps = []) => {
	useEffect(() => {
		if (!ref.current) return;

		const ctx = gsap.context(() => {
			gsap.from(ref.current, {
				y: 150,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ref.current,
					start: options.start || "top 80%",
					end: options.end || "top 30%",
					toggleActions: "play none none reverse",
					// markers: true
				},
			});
		}, ref);

		
		ScrollTrigger.refresh();

		return () => ctx.revert();
	}, deps);
};
