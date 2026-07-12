import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultOptions = {
	y: 80,
	x: 0,
	opacity: 0,
	scale: 1,
	duration: 1,
	delay: 0,
	ease: "power3.out",

	start: "top 85%",
	end: "bottom 20%",
	toggleActions: "play none none reverse",
	scrub: false,
	once: false,
};

export const useScrollAnim = (ref, options = {}, deps = []) => {
	useLayoutEffect(() => {
		if (!ref.current) return;

		const settings = {
			...defaultOptions,
			...options,
		};

		const ctx = gsap.context(() => {
			gsap.from(ref.current, {
				y: settings.y,
				x: settings.x,
				scale: settings.scale,
				opacity: settings.opacity,
				duration: settings.duration,
				delay: settings.delay,
				ease: settings.ease,

				scrollTrigger: {
					trigger: ref.current,
					start: settings.start,
					end: settings.end,
					scrub: settings.scrub,
					once: settings.once,
					toggleActions: settings.toggleActions,

					// markers: true,
				},
			});
		}, ref);

		return () => ctx.revert();
	}, [ref, ...deps]);
};
