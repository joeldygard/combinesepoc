import { renderToString } from "react-dom/server";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CombineLogo.tsx
/** Full COMBINE logotype. Intrinsic ratio 397.9 x 63.8 (6.236:1). */
function CombineLogotype({ className, label = "Combine" }) {
	const decorative = label === "";
	return /* @__PURE__ */ jsxs("svg", {
		className,
		viewBox: "0 0 397.9 63.8",
		fill: "currentColor",
		role: decorative ? void 0 : "img",
		"aria-label": decorative ? void 0 : label,
		"aria-hidden": decorative ? true : void 0,
		focusable: "false",
		children: [/* @__PURE__ */ jsx("path", { d: "M249.1 30.7c3-2.5 4.8-6.9 4.8-10.6 0-10.6-8.5-18.9-19.1-18.9h-15.3v13.7H235c7 0 7 10.9.1 10.9h-15.6v11.9h18.4c7 0 7 11.5.1 11.5h-18.5v13.5h17.9c12.6 0 19-8.7 19.1-19.4 0-5.5-2.4-10.1-7.4-12.6M85.1 31.9c0-24.3 33.9-24.3 33.9 0 0 24.5-33.9 24.5-33.9 0m48.5 0c0-42.5-63-42.5-63 0-.1 42.5 63 42.5 63 0M173.3 27.8L149.2 1.1h-5.8v14.3l29.1 30.5h1.7l16.2-16.8v33.6h13V1.1h-5.6zM299.6 1v14.1l47.2 47.7h5.6V1.3h-12.9v33.2L305.3 1zM271.1 1.2h14v61.4h-14zM367 1.2h30.9v13.4H367zM367 25.2h30.9v13.4H367zM367 49.2h30.9v13.4H367z" }), /* @__PURE__ */ jsx("path", { d: "M45.8 23.9h14.6C58 7.4 44.2.5 31.5.5 15.9.5.1 11 0 31.9c.1 20.9 15.9 31.4 31.5 31.3 13.1 0 26.9-6.8 29.1-24.2H46c-6 16.9-32.7 14.6-32.7-7.2.1-21.3 26-23.9 32.5-7.9" })]
	});
}
//#endregion
//#region src/assets/combine-symbol.png
var combine_symbol_default = "/assets/combine-symbol-DRtGZ7yJ.png";
//#endregion
//#region src/content/site.ts
/**
* Route metadata is kept independent from the browser. An SSG or SSR entry
* point can use the same table to choose a page, title, canonical URL and
* navigation state without importing client-only code.
*/
var routes = {
	home: {
		id: "home",
		label: "Home",
		path: "/",
		title: "Combine: AI for the physical world",
		description: "Combine builds AI for physical systems, where physics, safety and people set the requirements."
	},
	services: {
		id: "services",
		label: "Services",
		path: "/services/",
		title: "Services | Combine",
		description: "Fixed-price ways to assess the opportunity, audit the data and start with a complete industrial AI team."
	},
	projects: {
		id: "projects",
		label: "Projects",
		path: "/projects/",
		title: "Projects | Combine",
		description: "AI, control and software projects for water, ports, rail infrastructure and marine research."
	},
	build: {
		id: "build",
		label: "How we build",
		path: "/ai-for-the-physical-world/",
		title: "AI for the physical world | Combine",
		description: "Foundation models, machine learning, control engineering and software delivered as one traceable system."
	},
	products: {
		id: "products",
		label: "Products",
		path: "/products/",
		title: "Products | Combine",
		description: "Software owned and built by Combine, including Sympathy for Data."
	},
	insights: {
		id: "insights",
		label: "Insights",
		path: "/insights/",
		title: "Engineering notes | Combine",
		description: "Engineering notes about AI, controls and safety engineering for physical systems."
	},
	company: {
		id: "company",
		label: "Company",
		path: "/company/",
		title: "Company | Combine",
		description: "Combine is a control engineering and AI company with offices in Göteborg, Malmö and Linköping."
	},
	contact: {
		id: "contact",
		label: "Contact",
		path: "/contact/",
		title: "Talk to an engineer | Combine",
		description: "Talk to a Combine engineer about the operation, data or decision that needs to improve."
	}
};
var site = {
	name: "Combine",
	legalName: "Combine Control Systems AB",
	url: "https://combine.se",
	locale: "en_GB",
	email: "contact@combine.se",
	phone: "+46 31 797 10 12",
	careersUrl: "https://combine.teamtailor.com/",
	address: {
		street: "Västra Hamngatan 8",
		postalCode: "411 17",
		city: "Göteborg",
		country: "SE"
	},
	offices: [
		"Göteborg",
		"Malmö",
		"Linköping"
	],
	founded: "2002",
	social: [
		"https://www.linkedin.com/company/combine/",
		"https://www.facebook.com/combinesweden",
		"https://www.instagram.com/combinecontrolsystems/"
	]
};
var primaryNav = [
	{
		label: "Services",
		href: routes.services.path,
		route: "services"
	},
	{
		label: "Projects",
		href: routes.projects.path,
		route: "projects"
	},
	{
		label: "How we build",
		href: routes.build.path,
		route: "build"
	},
	{
		label: "Products",
		href: routes.products.path,
		route: "products"
	},
	{
		label: "Insights",
		href: routes.insights.path,
		route: "insights"
	},
	{
		label: "Career",
		href: site.careersUrl
	}
];
var navCta = {
	label: "Talk to an engineer",
	href: routes.contact.path,
	route: "contact"
};
var footerNav = [
	{
		heading: "Work with us",
		items: [
			{
				label: "Services",
				href: routes.services.path
			},
			{
				label: "Projects",
				href: routes.projects.path
			},
			{
				label: "How we build",
				href: routes.build.path
			}
		]
	},
	{
		heading: "Company",
		items: [
			{
				label: "Products",
				href: routes.products.path
			},
			{
				label: "Insights",
				href: routes.insights.path
			},
			{
				label: "Company",
				href: routes.company.path
			},
			{
				label: "Careers",
				href: site.careersUrl
			}
		]
	},
	{
		heading: "Contact",
		items: [{
			label: site.email,
			href: `mailto:${site.email}`
		}, {
			label: site.phone,
			href: "tel:+46317971012"
		}]
	}
];
var hero = {
	headline: "AI for the physical world",
	support: "Where physics, safety and people set the requirements.",
	statement: "We build AI for physical systems.",
	body: "For two decades we have built robust control systems for safety-critical environments in defence, automotive, medtech and critical infrastructure. Machine learning extended what we could do. Modern AI is expanding it further.",
	primaryCta: navCta,
	secondaryCta: {
		label: "See our projects",
		href: routes.projects.path
	}
};
var serviceEntryPoints = [
	{
		eyebrow: "Where to start",
		heading: "You have the data and the mandate. You do not have the team.",
		body: "Building one takes a year and five hires before you know whether it was worth it."
	},
	{
		eyebrow: "From pilot to production",
		heading: "The pilot impressed everyone. Then it stopped there.",
		body: "We build the rest: the data plumbing, the deployment and the interface that turn a working model into something people use every day."
	},
	{
		eyebrow: "Control and optimisation",
		heading: "Less energy, more capacity, fewer surprises.",
		body: "Control engineering and forecasting applied to processes that cost too much energy, run below capacity or fail without warning."
	},
	{
		eyebrow: "Safety-critical systems",
		heading: "Physical systems demand deterministic behaviour.",
		body: "We keep the learning parts out of the path that has to behave the same way every time."
	}
];
var stackLayers = [
	{
		name: "Foundation models",
		use: "Perception, forecasting, planning",
		age: "2024 onwards"
	},
	{
		name: "Classical machine learning",
		use: "Anomaly detection and optimisation",
		age: "2010s onwards"
	},
	{
		name: "Control engineering",
		use: "Model predictive control, state estimation, adaptive control",
		age: "1960s onwards"
	},
	{
		name: "Software and systems",
		use: "Data engineering, embedded, PLC, integration",
		age: "Always"
	}
];
var projects = [
	{
		client: "Smart Water",
		industry: "Water and wastewater",
		title: "Predictive monitoring for water and wastewater networks"
	},
	{
		client: "ACHT",
		industry: "Ports and logistics",
		title: "Loading liquid fuel with less time in port"
	},
	{
		client: "Redemptor",
		industry: "Rail infrastructure",
		title: "Track geometry measured from a moving vehicle"
	},
	{
		client: "Ocean Data Factory",
		industry: "Marine research",
		title: "Hundreds of hours of underwater footage, analysed automatically"
	}
];
var proof = {
	eyebrow: "Trusted in regulated industry",
	metrics: [
		{
			value: "~40",
			label: "Engineers"
		},
		{
			value: "~20%",
			label: "Hold a PhD"
		},
		{
			value: "2002",
			label: "Founded"
		},
		{
			value: "9001 · 14001",
			label: "ISO certified"
		}
	],
	infrastructure: "On-premise compute for model training, including air-gapped environments."
};
var services = {
	headline: "Most engagements start small and on a fixed price.",
	startingPoint: {
		eyebrow: "Where to start",
		heading: "You have the data and the mandate. You do not have the team.",
		body: "Building one takes a year and five hires before you know whether it was worth it. Starting with us takes one decision, and you can stop after the audit."
	},
	starts: [
		{
			index: "01",
			title: "AI for decision makers",
			body: "One day, fixed price. What AI is, what your data allows, and what you do not need to do yourselves."
		},
		{
			index: "02",
			title: "Data audit",
			body: "Fixed price. What you have, what is missing, and whether it is worth continuing."
		},
		{
			index: "03",
			title: "AI Excellence Team",
			body: "One decision away from a working AI team, with every role and the infrastructure already in place. Nothing to recruit, nothing to set up, and no function to build before the work can start."
		}
	],
	engagements: [{
		title: "Projects and partnerships",
		body: "We take responsibility for the outcome, from a defined scope to a long-term development partnership."
	}, {
		title: "Engineers in your team",
		body: "Senior specialists working inside your organisation, on your systems and under your process."
	}]
};
var build = {
	support: "Where physics, safety and people set the requirements.",
	intro: "Most AI works with text and images. Ours works with pumps, vehicles, production lines and power.",
	origin: {
		eyebrow: "Where we come from",
		heading: "We added AI to a control engineering company, not the other way round.",
		body: "Two decades in defence, automotive, medtech and critical infrastructure, where a wrong output has a physical consequence."
	},
	traceability: {
		eyebrow: "Traceability",
		heading: "The answer has to exist inside the system.",
		body: "Inputs, configuration, model versions and outputs stay connected, so a result from two years ago can be found and repeated."
	},
	platform: {
		eyebrow: "Combine Technology Platform",
		heading: "Reproducible by construction.",
		paragraphs: [
			"Our own platform covers the whole chain from raw data to deployed model: lineage, versioning, a model registry, experiment history and drift detection. We do not start from an empty repository.",
			"It runs on premise on our own compute infrastructure, so training and processing stay inside hardware we control rather than on a public cloud.",
			"Every result can be rebuilt from its inputs, which is what makes a system reviewable, maintainable and still trustworthy after the people who built it have moved on."
		]
	},
	rarity: {
		eyebrow: "Why the combination is rare",
		heading: "AI specialists reach for physics late. Engineering firms treat AI as an add-on.",
		body: "We work across all four layers, with roughly one in five of our engineers holding a PhD.",
		phrase: "AI + controls + safety engineering."
	}
};
var products = {
	headline: "We are not only a services company. We build and own software.",
	sympathy: {
		eyebrow: "Sympathy for Data",
		heading: "Data analysis you can hand to an auditor.",
		body: "A no-code workbench for measurement and process data where any result can be traced back and re-run years later, running on your own machines.",
		cta: {
			label: "Explore Sympathy",
			href: "https://sympathyfordata.com/"
		}
	}
};
var finalCta = {
	eyebrow: "What comes next",
	headline: "Tell us what is not working.",
	support: "Start with the operation, the data or the decision that needs to improve.",
	primaryCta: navCta,
	secondaryCta: {
		label: "Read our engineering notes",
		href: routes.insights.path
	},
	email: site.email
};
//#endregion
//#region src/lib/routes.ts
/** Prefix internal paths with Vite's deployment base while leaving URLs alone. */
function routeHref(href) {
	if (!href.startsWith("/")) return href;
	const base = "/";
	if (href === "/") return base;
	return `${base.replace(/\/$/, "")}${href}`;
}
//#endregion
//#region src/components/layout/SiteHeader.tsx
/**
* Attached and transparent over the hero; detaches into a floating pill once
* past it, with the symbol becoming a black coin that overhangs the bar.
*
* No elaborate scroll animation: one class flip at a threshold, and the state
* is only written when the threshold is actually crossed, so scrolling costs
* nothing. The menu markup is always in the DOM and toggled with `hidden`, so
* the links exist without client JavaScript.
*/
function SiteHeader({ currentRoute }) {
	const [detached, setDetached] = useState(false);
	const [open, setOpen] = useState(false);
	const panelId = useId();
	useEffect(() => {
		const onScroll = () => {
			const past = window.scrollY > 40;
			setDetached((cur) => cur === past ? cur : past);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ jsxs("header", {
		className: `hdr${detached ? " hdr--detached" : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hdr__inner container container--wide",
			children: [
				/* @__PURE__ */ jsxs("a", {
					className: "hdr__brand",
					href: routeHref(routes.home.path),
					"aria-label": "Combine, home",
					children: [/* @__PURE__ */ jsx("span", {
						className: "hdr__coin",
						children: /* @__PURE__ */ jsx("img", {
							className: "hdr__symbol",
							src: combine_symbol_default,
							alt: "",
							width: 636,
							height: 1024
						})
					}), /* @__PURE__ */ jsx(CombineLogotype, {
						className: "hdr__logotype",
						label: ""
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hdr__nav",
					"aria-label": "Primary",
					children: /* @__PURE__ */ jsx("ul", {
						className: "hdr__links",
						children: primaryNav.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
							href: routeHref(item.href),
							className: item.route === currentRoute ? "is-current" : void 0,
							"aria-current": item.route === currentRoute ? "page" : void 0,
							...item.href.startsWith("http") ? {
								target: "_blank",
								rel: "noreferrer"
							} : {},
							children: item.label
						}) }, item.href))
					})
				}),
				/* @__PURE__ */ jsx("a", {
					className: "hdr__cta",
					href: routeHref(navCta.href),
					"aria-current": currentRoute === navCta.route ? "page" : void 0,
					children: navCta.label
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "hdr__toggle",
					"aria-expanded": open,
					"aria-controls": panelId,
					onClick: () => setOpen((o) => !o),
					children: [/* @__PURE__ */ jsx("span", {
						className: "hdr__toggle-text",
						children: open ? "Close" : "Menu"
					}), /* @__PURE__ */ jsxs("span", {
						className: `hdr__glyph${open ? " is-open" : ""}`,
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("i", {}), /* @__PURE__ */ jsx("i", {})]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "hdr__panel",
			id: panelId,
			hidden: !open,
			children: /* @__PURE__ */ jsx("nav", {
				className: "container",
				"aria-label": "Primary, mobile",
				children: /* @__PURE__ */ jsxs("ul", { children: [primaryNav.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
					href: routeHref(item.href),
					"aria-current": item.route === currentRoute ? "page" : void 0,
					...item.href.startsWith("http") ? {
						target: "_blank",
						rel: "noreferrer"
					} : {},
					onClick: () => setOpen(false),
					children: item.label
				}) }, item.href)), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
					className: "hdr__panel-cta",
					href: routeHref(navCta.href),
					onClick: () => setOpen(false),
					children: navCta.label
				}) })] })
			})
		})]
	});
}
//#endregion
//#region src/components/layout/SiteFooter.tsx
function SiteFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "ftr field-inverse",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container container--wide ftr__inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "ftr__brand",
				children: [/* @__PURE__ */ jsx(CombineLogotype, { className: "ftr__logotype" }), /* @__PURE__ */ jsxs("p", {
					className: "u-small u-secondary ftr__address",
					children: [
						site.address.street,
						/* @__PURE__ */ jsx("br", {}),
						site.address.postalCode,
						" ",
						site.address.city,
						", Sweden",
						/* @__PURE__ */ jsx("br", {}),
						"Founded ",
						site.founded
					]
				})]
			}), footerNav.map((group) => /* @__PURE__ */ jsxs("nav", {
				className: "ftr__group",
				"aria-label": group.heading,
				children: [/* @__PURE__ */ jsx("h2", {
					className: "u-eyebrow ftr__heading",
					children: group.heading
				}), /* @__PURE__ */ jsx("ul", { children: group.items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
					href: routeHref(item.href),
					...item.href.startsWith("http") ? {
						target: "_blank",
						rel: "noreferrer"
					} : {},
					children: item.label
				}) }, item.href)) })]
			}, group.heading))]
		}), /* @__PURE__ */ jsxs("div", {
			className: "container container--wide",
			children: [/* @__PURE__ */ jsx("hr", { className: "rule" }), /* @__PURE__ */ jsxs("p", {
				className: "u-small u-secondary ftr__legal",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					site.legalName,
					"."
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/base/Button.tsx
function Button({ href, children, variant = "primary", onDark = false, className }) {
	const external = /^https?:|^mailto:|^tel:/.test(href);
	return /* @__PURE__ */ jsx("a", {
		className: [
			"btn",
			`btn--${variant}`,
			onDark ? "btn--on-dark" : "",
			className ?? ""
		].filter(Boolean).join(" "),
		href: routeHref(href),
		...external && href.startsWith("http") ? {
			target: "_blank",
			rel: "noreferrer"
		} : {},
		children
	});
}
//#endregion
//#region src/components/base/SectionIntro.tsx
function SectionIntro({ heading, eyebrow, intro, id, align = "start", children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `sec-intro sec-intro--${align}`,
		children: [
			eyebrow && /* @__PURE__ */ jsxs("p", {
				className: "u-eyebrow sec-intro__eyebrow",
				children: [/* @__PURE__ */ jsx("span", {
					className: "sec-intro__marker",
					"aria-hidden": "true"
				}), eyebrow]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "u-h2",
				id,
				children: heading
			}),
			intro && /* @__PURE__ */ jsx("p", {
				className: "u-lede u-secondary sec-intro__lede",
				children: intro
			}),
			children
		]
	});
}
//#endregion
//#region src/components/DriftHero.tsx
var PLANES = 6;
var DENSITY = 32;
var R_NEAR = 2.6;
var R_FAR = .7;
var V_NEAR = 12;
var V_FAR = 1.5;
var SPEED = 1.6;
var A_NEAR = 1;
var A_FAR = .33;
var WANDER = .16;
var DOT_GLOW = 0;
var RANGE_NEAR = 180;
var RANGE_FAR = 90;
var LINK_WIDTH = .61;
var LINK_ALPHA = .8;
var MAX_LINKS = 6;
var RESISTANCE = 1;
/**
* Molecular soup. A link tugs both endpoints along its axis, weighted by the
* link's own opacity, so bright (close) bonds pull harder. PULL is the peak
* acceleration in css px/s² applied to a near-plane dot.
*
* The force only ever steers — see the governor in `advance()`, which restores
* each dot's assigned speed afterwards. Without that, near dots decelerate to
* ~0.45x and far dots overshoot to ~1.34x, which destroys the size↔speed depth
* cue the whole effect rests on.
*/
var PULL = 14;
/**
* Short-range core, as a fraction of a pair's link range. Beyond ~1.6x this the
* force is pure attraction; inside it eases through zero and turns repulsive.
* Net attraction alone is an aggregating process: over ten minutes it drives the
* closest pair to ~1px (visibly overlapping glows). This keeps a floor under the
* spacing while leaving the mid-range behaviour untouched.
*/
var CORE = .18;
/**
* Anti-flicker hysteresis, in seconds.
*
* HOLD: once formed, a link may not dim or be released for this long — not by
* drifting out of range, and not by losing the degree cap.
* COOLDOWN: once broken, that exact pair may not reconnect for this long.
*
* Together they put a floor of HOLD + COOLDOWN on any single pair's on/off
* cycle, which is what actually kills twinkling. Opacity easing alone only
* smooths each transition; it does nothing about their frequency.
*/
var HOLD = 3;
var COOLDOWN = 3;
/**
* Recently-broken peers remembered per dot. A dot can shed at most MAX_LINKS
* links per HOLD window, so this must be >= MAX_LINKS or the refractory entries
* evict each other and pairs reconnect early, breaking the cooldown guarantee.
*/
var COOL_SLOTS = 8;
var FG = "#91f9f7";
var BG = "#000000";
/** Opacity time constant, and the hysteresis gap between forming and breaking. */
var TAU = .015 * Math.pow(60, RESISTANCE);
var FORM = 1 - .3 * RESISTANCE;
/** Below this opacity a link is released. */
var EPS = .004;
/** Sprite extent as a multiple of dot radius, widened to fit the glow. */
var SPRITE_K = 1.35;
/** Stroke batching. Alpha-major so the glow pass can walk contiguous ranges. */
var W_BINS = 4;
var A_BINS = 6;
var N_BINS = W_BINS * A_BINS;
var HALO_GROUPS = A_BINS / 2;
/**
* Quality ladder. `scale` multiplies the backing-store resolution, `step` is the
* fixed simulation/render period, `halo` toggles the link bloom pass. Index 0 is
* best; the runtime only ever walks downward, so it can never oscillate.
*/
var TIERS = [
	{
		scale: 1,
		step: 1 / 60,
		halo: true
	},
	{
		scale: .82,
		step: 1 / 60,
		halo: true
	},
	{
		scale: .72,
		step: 1 / 30,
		halo: true
	},
	{
		scale: .6,
		step: 1 / 30,
		halo: false
	}
];
var lerp = (a, b, t) => a + (b - a) * t;
/** Hex → rgb, so gradient stops need no DOM round-trip. */
function hexRgb(hex) {
	const h = hex.replace("#", "");
	const s = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
	const n = parseInt(s, 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
var RGB = hexRgb(FG);
var rgba = (a) => `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a})`;
/** One dot, pre-rendered with opacity and glow baked in. Blitted with no state changes. */
function makeSprite(radius, alpha, dpr) {
	const half = radius * SPRITE_K;
	const size = Math.max(2, Math.ceil(half * 2 * dpr));
	const c = document.createElement("canvas");
	c.width = size;
	c.height = size;
	const ctx = c.getContext("2d");
	ctx.scale(dpr, dpr);
	const g = ctx.createRadialGradient(half, half, 0, half, half, half);
	const coreIn = radius * .9 / half;
	const coreOut = radius * 1.25 / half;
	g.addColorStop(0, rgba(1));
	g.addColorStop(coreIn, rgba(1));
	g.addColorStop(coreOut, rgba(.34 * DOT_GLOW));
	g.addColorStop(lerp(coreOut, 1, .45), rgba(.1 * DOT_GLOW));
	g.addColorStop(1, rgba(0));
	ctx.globalAlpha = alpha;
	ctx.fillStyle = g;
	ctx.beginPath();
	ctx.arc(half, half, half, 0, Math.PI * 2);
	ctx.fill();
	return c;
}
var planeT = [];
var planeR = new Float32Array(PLANES);
var planeA = new Float32Array(PLANES);
var planeV = new Float32Array(PLANES);
var planeHalf = new Float32Array(PLANES);
var planeWeight = new Float32Array(PLANES);
var weightSum = 0;
for (let i = 0; i < PLANES; i++) {
	const t = i / (PLANES - 1);
	planeT.push(t);
	planeR[i] = lerp(R_NEAR, R_FAR, t);
	planeA[i] = lerp(A_NEAR, A_FAR, t);
	planeV[i] = lerp(V_NEAR, V_FAR, t) * SPEED;
	planeHalf[i] = planeR[i] * SPRITE_K;
	planeWeight[i] = 1 + t * 2.2;
	weightSum += planeWeight[i];
}
var pairRange2 = new Float32Array(PLANES * PLANES);
var pairForm2 = new Float32Array(PLANES * PLANES);
var pairInvRange = new Float32Array(PLANES * PLANES);
var pairAlpha = new Float32Array(PLANES * PLANES);
var pairBin = new Uint8Array(PLANES * PLANES);
var pairCore = new Float32Array(PLANES * PLANES);
var binLineWidth = new Float32Array(W_BINS);
{
	const w = new Float32Array(PLANES * PLANES);
	let wMin = Infinity;
	let wMax = 0;
	for (let a = 0; a < PLANES; a++) for (let b = 0; b < PLANES; b++) {
		const k = a * PLANES + b;
		const range = (lerp(RANGE_NEAR, RANGE_FAR, planeT[a]) + lerp(RANGE_NEAR, RANGE_FAR, planeT[b])) * .5;
		pairRange2[k] = range * range;
		pairForm2[k] = range * FORM * (range * FORM);
		pairInvRange[k] = 1 / range;
		pairCore[k] = range * CORE;
		pairAlpha[k] = Math.min(planeA[a], planeA[b]) * LINK_ALPHA;
		w[k] = (planeR[a] + planeR[b]) * .5 * LINK_WIDTH;
		if (w[k] < wMin) wMin = w[k];
		if (w[k] > wMax) wMax = w[k];
	}
	const span = wMax - wMin || 1;
	const sum = new Float32Array(W_BINS);
	const cnt = new Int32Array(W_BINS);
	for (let k = 0; k < w.length; k++) {
		const b = Math.min(W_BINS - 1, (w[k] - wMin) / span * W_BINS | 0);
		pairBin[k] = b;
		sum[b] += w[k];
		cnt[b]++;
	}
	for (let b = 0; b < W_BINS; b++) binLineWidth[b] = cnt[b] ? sum[b] / cnt[b] : lerp(wMin, wMax, (b + .5) / W_BINS);
}
(binLineWidth[0] + binLineWidth[W_BINS - 1]) * .5 * 1;
function DriftHero({ className, style }) {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", {
			alpha: false,
			desynchronized: true
		});
		if (!ctx) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const rawDpr = Math.min(window.devicePixelRatio || 1, 2);
		const cores = navigator.hardwareConcurrency || 4;
		const coarse = window.matchMedia("(pointer: coarse)").matches;
		let tier = 0;
		if (coarse) tier++;
		if (cores <= 4) tier++;
		if ((window.devicePixelRatio || 1) > 2.5) tier++;
		if (tier > 2) tier = 2;
		let width = 0;
		let height = 0;
		let raf = 0;
		let onScreen = true;
		let tabVisible = !document.hidden;
		let sprites = [];
		let spriteDpr = 0;
		let count = 0;
		let px = /* @__PURE__ */ new Float32Array(0);
		let py = /* @__PURE__ */ new Float32Array(0);
		let vx = /* @__PURE__ */ new Float32Array(0);
		let vy = /* @__PURE__ */ new Float32Array(0);
		let rotC = /* @__PURE__ */ new Float32Array(0);
		let rotS = /* @__PURE__ */ new Float32Array(0);
		let turn = /* @__PURE__ */ new Float32Array(0);
		let dotHalf = /* @__PURE__ */ new Float32Array(0);
		let dotPlane = /* @__PURE__ */ new Uint8Array(0);
		let accX = /* @__PURE__ */ new Float32Array(0);
		let accY = /* @__PURE__ */ new Float32Array(0);
		/** The speed the governor restores each step — this dot's share of its plane. */
		let dotSpeed = /* @__PURE__ */ new Float32Array(0);
		/** Depth-scaled force response, so near dots turn as readily as they drift. */
		let dotPull = /* @__PURE__ */ new Float32Array(0);
		let cols = 0;
		let rows = 0;
		let cellHead = /* @__PURE__ */ new Int32Array(0);
		const CELL = RANGE_NEAR;
		let cellNext = /* @__PURE__ */ new Int32Array(0);
		/**
		* Fixed-degree adjacency. Each dot owns MAX_LINKS slots holding a peer index
		* and that link's opacity; both endpoints keep a mirrored copy. A lookup is
		* a scan of three, the degree cap holds by construction, and incumbency is
		* automatic — a slot's owner keeps it until the link actually fades out.
		* No hashing, no probing, no whole-table sweep.
		*/
		let peer = /* @__PURE__ */ new Int32Array(0);
		let str = /* @__PURE__ */ new Float32Array(0);
		let fresh = /* @__PURE__ */ new Uint8Array(0);
		let slotBin = /* @__PURE__ */ new Uint8Array(0);
		/** Sim time at which each slot's link formed, for the HOLD window. */
		let slotBorn = /* @__PURE__ */ new Float32Array(0);
		let coolPeer = /* @__PURE__ */ new Int32Array(0);
		let coolUntil = /* @__PURE__ */ new Float32Array(0);
		/** Fixed-step clock. Advances with the sim, so it pauses when the tab does. */
		let simTime = 0;
		let seg = /* @__PURE__ */ new Float32Array(0);
		const binCount = new Int32Array(N_BINS);
		const binStart = new Int32Array(N_BINS);
		const binFill = new Int32Array(N_BINS);
		const groupStart = new Int32Array(HALO_GROUPS);
		const groupEnd = new Int32Array(HALO_GROUPS);
		let step = TIERS[tier].step;
		let rise = 0;
		let fall = 0;
		let accum = 0;
		const applyRates = () => {
			rise = 1 - Math.exp(-step / TAU);
			fall = 1 - Math.exp(-step / (TAU * 1.5));
			for (let i = 0; i < count; i++) {
				const a = turn[i] * step;
				rotC[i] = Math.cos(a);
				rotS[i] = Math.sin(a);
			}
		};
		const resizeBacking = () => {
			const s = rawDpr * TIERS[tier].scale;
			canvas.width = Math.max(1, Math.round(width * s));
			canvas.height = Math.max(1, Math.round(height * s));
			ctx.setTransform(s, 0, 0, s, 0, 0);
			if (Math.abs(s - spriteDpr) > .01) {
				spriteDpr = s;
				sprites = [];
				for (let i = 0; i < PLANES; i++) sprites.push(makeSprite(planeR[i], planeA[i], s));
			}
		};
		const build = (w, h) => {
			const scaleX = width ? w / width : 0;
			const scaleY = height ? h / height : 0;
			const had = count > 0;
			width = w;
			height = h;
			resizeBacking();
			const budget = Math.max(PLANES, Math.round(w * h / 1e5 * DENSITY));
			const counts = [];
			let total = 0;
			for (let i = 0; i < PLANES; i++) {
				const n = Math.max(1, Math.round(budget * planeWeight[i] / weightSum));
				counts.push(n);
				total += n;
			}
			const oCount = count;
			const ox = px;
			const oy = py;
			const ovx = vx;
			const ovy = vy;
			const oturn = turn;
			const oplane = dotPlane;
			count = total;
			px = new Float32Array(total);
			py = new Float32Array(total);
			vx = new Float32Array(total);
			vy = new Float32Array(total);
			rotC = new Float32Array(total);
			rotS = new Float32Array(total);
			turn = new Float32Array(total);
			dotHalf = new Float32Array(total);
			dotPlane = new Uint8Array(total);
			accX = new Float32Array(total);
			accY = new Float32Array(total);
			dotSpeed = new Float32Array(total);
			dotPull = new Float32Array(total);
			cellNext = new Int32Array(total);
			peer = new Int32Array(total * MAX_LINKS).fill(-1);
			str = new Float32Array(total * MAX_LINKS);
			fresh = new Uint8Array(total * MAX_LINKS);
			slotBin = new Uint8Array(total * MAX_LINKS);
			slotBorn = new Float32Array(total * MAX_LINKS);
			coolPeer = new Int32Array(total * COOL_SLOTS).fill(-1);
			coolUntil = new Float32Array(total * COOL_SLOTS);
			seg = new Float32Array((total * MAX_LINKS >> 1) * 4 + 4);
			let k = 0;
			for (let i = 0; i < PLANES; i++) for (let j = 0; j < counts[i]; j++, k++) {
				dotPlane[k] = i;
				dotHalf[k] = planeHalf[i];
				dotPull[k] = PULL * (planeV[i] / planeV[0]);
				if (had && k < oCount && oplane[k] === i) {
					px[k] = ox[k] * scaleX;
					py[k] = oy[k] * scaleY;
					vx[k] = ovx[k];
					vy[k] = ovy[k];
					turn[k] = oturn[k];
					dotSpeed[k] = Math.sqrt(ovx[k] * ovx[k] + ovy[k] * ovy[k]) || planeV[i];
					continue;
				}
				const ang = Math.random() * Math.PI * 2;
				const v = planeV[i] * (.55 + Math.random() * .9);
				px[k] = Math.random() * w;
				py[k] = Math.random() * h;
				vx[k] = Math.cos(ang) * v;
				vy[k] = Math.sin(ang) * v;
				dotSpeed[k] = v;
				turn[k] = (Math.random() * 2 - 1) * WANDER * SPEED;
			}
			cols = Math.max(1, Math.ceil(w / CELL) + 1);
			rows = Math.max(1, Math.ceil(h / CELL) + 1);
			cellHead = new Int32Array(cols * rows);
			applyRates();
		};
		/** True while this pair is still serving its post-break refractory period. */
		const cooling = (a, b) => {
			const a0 = a * COOL_SLOTS;
			for (let k = a0; k < a0 + COOL_SLOTS; k++) if (coolPeer[k] === b) return coolUntil[k] > simTime;
			return false;
		};
		/** Records the refractory period on one endpoint, evicting the stalest entry. */
		const noteCool = (a, b, until) => {
			const a0 = a * COOL_SLOTS;
			let victim = a0;
			let stalest = Infinity;
			for (let k = a0; k < a0 + COOL_SLOTS; k++) {
				if (coolPeer[k] === b) {
					coolUntil[k] = until;
					return;
				}
				if (coolUntil[k] < stalest) {
					stalest = coolUntil[k];
					victim = k;
				}
			}
			coolPeer[victim] = b;
			coolUntil[victim] = until;
		};
		/** Clears both halves of a link and opens the refractory window on the pair. */
		const release = (slot, i, j) => {
			peer[slot] = -1;
			const sj0 = j * MAX_LINKS;
			for (let t = sj0; t < sj0 + MAX_LINKS; t++) if (peer[t] === i) {
				peer[t] = -1;
				break;
			}
			const until = simTime + COOLDOWN;
			noteCool(i, j, until);
			noteCool(j, i, until);
		};
		/**
		* One fixed step: rotate the heading by a precomputed angle, add the link
		* force, renormalise back to the dot's assigned speed, translate, wrap.
		*
		* The renormalisation is what makes this safe. Direction is fully open to
		* influence; magnitude never moves, so depth stays legible.
		*/
		const advance = () => {
			simTime += step;
			for (let i = 0; i < count; i++) {
				const c = rotC[i];
				const s = rotS[i];
				const ox = vx[i];
				const oy = vy[i];
				let nx = ox * c - oy * s;
				let ny = ox * s + oy * c;
				nx += accX[i] * step;
				ny += accY[i] * step;
				const sp = Math.sqrt(nx * nx + ny * ny);
				if (sp > 1e-6) {
					const g = dotSpeed[i] / sp;
					nx *= g;
					ny *= g;
				}
				vx[i] = nx;
				vy[i] = ny;
				const half = dotHalf[i];
				let x = px[i] + nx * step;
				let y = py[i] + ny * step;
				if (x < -half) x += width + half * 2;
				else if (x > width + half) x -= width + half * 2;
				if (y < -half) y += height + half * 2;
				else if (y > height + half) y -= height + half * 2;
				px[i] = x;
				py[i] = y;
			}
		};
		/**
		* Refreshes existing links, forms new ones into free slots, and decays the
		* rest. Pairs are visited exactly once by scanning only the forward half of
		* each cell's neighbourhood.
		*/
		const relink = () => {
			cellHead.fill(-1);
			for (let i = 0; i < count; i++) {
				let cx = px[i] / CELL | 0;
				let cy = py[i] / CELL | 0;
				if (cx < 0) cx = 0;
				else if (cx >= cols) cx = cols - 1;
				if (cy < 0) cy = 0;
				else if (cy >= rows) cy = rows - 1;
				const c = cy * cols + cx;
				cellNext[i] = cellHead[c];
				cellHead[c] = i;
			}
			fresh.fill(0);
			accX.fill(0);
			accY.fill(0);
			for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) for (let i = cellHead[cy * cols + cx]; i !== -1; i = cellNext[i]) {
				const xi = px[i];
				const yi = py[i];
				const si0 = i * MAX_LINKS;
				for (let n = -1; n < 4; n++) {
					let j;
					if (n === -1) j = cellNext[i];
					else {
						const ax = cx + (n === 1 ? -1 : n === 2 ? 0 : 1);
						const ay = cy + (n === 0 ? 0 : 1);
						if (ax < 0 || ax >= cols || ay < 0 || ay >= rows) continue;
						j = cellHead[ay * cols + ax];
					}
					for (; j !== -1; j = cellNext[j]) {
						const dx = px[j] - xi;
						const dy = py[j] - yi;
						const d2 = dx * dx + dy * dy;
						const pk = dotPlane[i] * PLANES + dotPlane[j];
						if (d2 > pairRange2[pk]) continue;
						let si = -1;
						let siFree = -1;
						for (let s = si0; s < si0 + MAX_LINKS; s++) {
							const p = peer[s];
							if (p === j) {
								si = s;
								break;
							}
							if (p === -1 && siFree === -1) siFree = s;
						}
						if (si === -1) {
							if (d2 > pairForm2[pk]) continue;
							if (siFree === -1) continue;
							if (cooling(i, j) || cooling(j, i)) continue;
							const sj0 = j * MAX_LINKS;
							let sjFree = -1;
							for (let s = sj0; s < sj0 + MAX_LINKS; s++) if (peer[s] === -1) {
								sjFree = s;
								break;
							}
							if (sjFree === -1) continue;
							si = siFree;
							peer[si] = j;
							peer[sjFree] = i;
							str[si] = 0;
							str[sjFree] = 0;
							slotBorn[si] = simTime;
							slotBorn[sjFree] = simTime;
						}
						let sj = -1;
						const sj0 = j * MAX_LINKS;
						for (let s = sj0; s < sj0 + MAX_LINKS; s++) if (peer[s] === i) {
							sj = s;
							break;
						}
						if (sj === -1) {
							peer[si] = -1;
							continue;
						}
						const d = Math.sqrt(d2);
						const prox = 1 - d * pairInvRange[pk];
						let target = prox * prox * pairAlpha[pk];
						const prev = str[si];
						if (target < prev && simTime - slotBorn[si] < HOLD) target = prev;
						const v = prev + (target - prev) * (target > prev ? rise : fall);
						str[si] = v;
						str[sj] = v;
						fresh[si] = 1;
						fresh[sj] = 1;
						if (d > .001) {
							const core = pairCore[pk];
							let t = (d - core) / (core * .6);
							if (t > 1) t = 1;
							else if (t < -1) t = -1;
							const w = v / LINK_ALPHA * t;
							const ux = dx / d * w;
							const uy = dy / d * w;
							accX[i] += ux * dotPull[i];
							accY[i] += uy * dotPull[i];
							accX[j] -= ux * dotPull[j];
							accY[j] -= uy * dotPull[j];
						}
					}
				}
			}
			const n = count * MAX_LINKS;
			for (let s = 0; s < n; s++) {
				const j = peer[s];
				if (j === -1 || fresh[s] === 1) continue;
				if (simTime - slotBorn[s] < HOLD) continue;
				const v = str[s] * (1 - fall);
				if (v > EPS) {
					str[s] = v;
					continue;
				}
				release(s, s / MAX_LINKS | 0, j);
			}
		};
		/**
		* Counting-sorts live links into `seg` by bin so each bin strokes as one
		* path. Bins are alpha-major, which leaves the glow pass three contiguous
		* spans to walk instead of re-reading everything.
		*/
		const sortSegments = () => {
			binCount.fill(0);
			const n = count * MAX_LINKS;
			const invA = A_BINS / LINK_ALPHA;
			const maxLen2 = CELL * 2.5 * (CELL * 2.5);
			for (let s = 0; s < n; s++) {
				const j = peer[s];
				const i = s / MAX_LINKS | 0;
				if (j <= i) continue;
				const a = str[s];
				if (a <= EPS) continue;
				const dx = px[j] - px[i];
				const dy = py[j] - py[i];
				if (dx * dx + dy * dy > maxLen2) continue;
				let ab = a * invA | 0;
				if (ab >= A_BINS) ab = A_BINS - 1;
				const bin = ab * W_BINS + pairBin[dotPlane[i] * PLANES + dotPlane[j]];
				slotBin[s] = bin + 1;
				binCount[bin]++;
			}
			let acc = 0;
			for (let b = 0; b < N_BINS; b++) {
				binStart[b] = acc;
				binFill[b] = acc;
				acc += binCount[b] * 4;
			}
			for (let g = 0; g < HALO_GROUPS; g++) {
				const first = g * 2 * W_BINS;
				groupStart[g] = binStart[first];
				let end = binStart[first];
				for (let b = first; b < first + 2 * W_BINS; b++) end += binCount[b] * 4;
				groupEnd[g] = end;
			}
			for (let s = 0; s < n; s++) {
				const tag = slotBin[s];
				if (tag === 0) continue;
				slotBin[s] = 0;
				const b = tag - 1;
				const i = s / MAX_LINKS | 0;
				const j = peer[s];
				const o = binFill[b];
				seg[o] = px[i];
				seg[o + 1] = py[i];
				seg[o + 2] = px[j];
				seg[o + 3] = py[j];
				binFill[b] = o + 4;
			}
		};
		const strokeSpan = (from, to) => {
			ctx.beginPath();
			for (let o = from; o < to; o += 4) {
				ctx.moveTo(seg[o], seg[o + 1]);
				ctx.lineTo(seg[o + 2], seg[o + 3]);
			}
			ctx.stroke();
		};
		const draw = () => {
			ctx.fillStyle = BG;
			ctx.fillRect(0, 0, width, height);
			ctx.strokeStyle = FG;
			for (let ab = 0; ab < A_BINS; ab++) {
				ctx.globalAlpha = LINK_ALPHA * (ab + .5) / A_BINS;
				for (let wb = 0; wb < W_BINS; wb++) {
					const b = ab * W_BINS + wb;
					if (binCount[b] === 0) continue;
					ctx.lineWidth = binLineWidth[wb];
					strokeSpan(binStart[b], binStart[b] + binCount[b] * 4);
				}
			}
			ctx.globalAlpha = 1;
			for (let i = 0; i < count; i++) {
				const half = dotHalf[i];
				const size = half * 2;
				ctx.drawImage(sprites[dotPlane[i]], px[i] - half, py[i] - half, size, size);
			}
		};
		const renderOnce = () => {
			relink();
			sortSegments();
			draw();
		};
		let lastRender = 0;
		let intervalEma = 0;
		let framesAtTier = 0;
		const lockedOut = new Uint8Array(TIERS.length);
		const applyTier = () => {
			step = TIERS[tier].step;
			applyRates();
			resizeBacking();
			intervalEma = 0;
			framesAtTier = 0;
			lastRender = 0;
		};
		const gauge = (now) => {
			if (lastRender !== 0) {
				const gap = now - lastRender;
				if (gap < 250) intervalEma = intervalEma === 0 ? gap : intervalEma * .94 + gap * .06;
			}
			lastRender = now;
			framesAtTier++;
			const target = step * 1e3;
			if (framesAtTier > 90 && intervalEma > target * 1.35 && tier < TIERS.length - 1) {
				lockedOut[tier] = 1;
				tier++;
				applyTier();
			} else if (framesAtTier > 420 && intervalEma > 0 && intervalEma < target * 1.06 && tier > 0 && !lockedOut[tier - 1]) {
				tier--;
				applyTier();
			}
		};
		let prev = 0;
		const frame = (now) => {
			raf = requestAnimationFrame(frame);
			if (!onScreen || !tabVisible) {
				prev = now;
				return;
			}
			if (prev === 0) prev = now;
			let dt = (now - prev) / 1e3;
			prev = now;
			if (dt > .25) dt = .25;
			accum += dt;
			if (accum < step) return;
			let steps = 0;
			while (accum >= step && steps < 2) {
				advance();
				accum -= step;
				steps++;
			}
			if (accum > step) accum = step;
			renderOnce();
			gauge(now);
		};
		let resizeTimer = 0;
		const ro = new ResizeObserver(([entry]) => {
			const box = entry.contentRect;
			const w = Math.max(1, Math.round(box.width));
			const h = Math.max(1, Math.round(box.height));
			if (w === width && h === height) return;
			if (width && h !== height && w === width && Math.abs(h - height) < height * .2) return;
			clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				if (w === width && h === height) return;
				build(w, h);
				renderOnce();
			}, 150);
		});
		ro.observe(canvas);
		const io = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
		}, { rootMargin: "64px" });
		io.observe(canvas);
		const onVisibility = () => {
			tabVisible = !document.hidden;
			if (tabVisible) {
				prev = 0;
				accum = 0;
				lastRender = 0;
				intervalEma = 0;
			}
		};
		document.addEventListener("visibilitychange", onVisibility);
		build(Math.max(1, Math.round(canvas.clientWidth)), Math.max(1, Math.round(canvas.clientHeight)));
		renderOnce();
		if (!reduced) raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(resizeTimer);
			ro.disconnect();
			io.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);
	return /* @__PURE__ */ jsx("canvas", {
		ref: canvasRef,
		className,
		"aria-hidden": "true",
		style: {
			display: "block",
			width: "100%",
			height: "100%",
			...style
		}
	});
}
//#endregion
//#region src/lib/motion.ts
/**
* Media queries via useSyncExternalStore rather than useState + useEffect.
*
* Two reasons this matters: it needs no setState inside an effect (which causes
* cascading renders), and it takes a server snapshot — so nothing touches
* `window` during render and the tree stays renderable without a browser.
*/
function useMediaQuery(query, serverValue = false) {
	return useSyncExternalStore(useCallback((onChange) => {
		const mq = window.matchMedia(query);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [query]), useCallback(() => window.matchMedia(query).matches, [query]), useCallback(() => serverValue, [serverValue]));
}
/** Live: the OS setting can change without a reload. */
function usePrefersReducedMotion() {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}
//#endregion
//#region src/components/home/Hero.tsx
/** Below this fraction of the hero remaining visible, the field fades out. */
var FADE_BELOW = .55;
/**
* The simulation belongs to the hero and nowhere else.
*
* The fade is driven by how much of the hero is still on screen, observed with
* coarse thresholds — not by a sentinel element. An absolutely-positioned
* sentinel near the hero's foot is already inside the viewport at scroll 0, so
* it reports "leaving" on the first callback and the field never appears.
*
* Simulation state stays uncoupled from scroll: only the wrapper's opacity
* changes, and DriftHero's own observer stops the canvas once it leaves view.
*/
function Hero() {
	const section = useRef(null);
	const [leaving, setLeaving] = useState(false);
	const reduced = usePrefersReducedMotion();
	useEffect(() => {
		if (reduced) return;
		const el = section.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			setLeaving(entry.intersectionRatio < FADE_BELOW);
		}, { threshold: [
			0,
			.15,
			.3,
			.45,
			.55,
			.7,
			.85,
			1
		] });
		io.observe(el);
		return () => io.disconnect();
	}, [reduced]);
	return /* @__PURE__ */ jsxs("section", {
		className: "hero field-inverse",
		id: "top",
		ref: section,
		"aria-labelledby": "hero-heading",
		children: [/* @__PURE__ */ jsx("div", {
			className: `hero__sim${leaving ? " is-leaving" : ""}`,
			children: /* @__PURE__ */ jsx(DriftHero, {})
		}), /* @__PURE__ */ jsxs("div", {
			className: "container hero__inner",
			children: [
				/* @__PURE__ */ jsx(CombineLogotype, { className: "hero__logotype" }),
				/* @__PURE__ */ jsx("h1", {
					className: "u-display hero__headline",
					id: "hero-heading",
					children: hero.headline
				}),
				/* @__PURE__ */ jsx("p", {
					className: "u-lede hero__support",
					children: hero.support
				}),
				/* @__PURE__ */ jsx("p", {
					className: "u-h4 hero__statement",
					children: hero.statement
				}),
				/* @__PURE__ */ jsx("p", {
					className: "u-body hero__support",
					children: hero.body
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hero__actions",
					children: [/* @__PURE__ */ jsx(Button, {
						href: hero.primaryCta.href,
						variant: "primary",
						onDark: true,
						children: hero.primaryCta.label
					}), /* @__PURE__ */ jsx(Button, {
						href: hero.secondaryCta.href,
						variant: "secondary",
						onDark: true,
						children: hero.secondaryCta.label
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/home/FinalCta.tsx
/**
* Black field. A static crop of the particle motif — no simulation, no pointer
* interaction, so the strongest visual idea is echoed rather than repeated.
*/
function FinalCta() {
	return /* @__PURE__ */ jsxs("section", {
		className: "section field-inverse fcta",
		id: "contact",
		"aria-labelledby": "contact-heading",
		children: [/* @__PURE__ */ jsx("div", {
			className: "fcta__motif",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 400 200",
				preserveAspectRatio: "xMidYMid slice",
				children: [/* @__PURE__ */ jsx("g", {
					className: "fcta__links",
					children: /* @__PURE__ */ jsx("path", { d: "M42 58 L118 96M118 96 L196 62M196 62 L268 104M268 104 L342 74M118 96 L104 158M196 62 L214 132M268 104 L296 160M104 158 L214 132" })
				}), /* @__PURE__ */ jsx("g", {
					className: "fcta__nodes",
					children: [
						[
							42,
							58,
							3.2
						],
						[
							118,
							96,
							4.4
						],
						[
							196,
							62,
							3.8
						],
						[
							268,
							104,
							4.6
						],
						[
							342,
							74,
							2.8
						],
						[
							104,
							158,
							3.4
						],
						[
							214,
							132,
							4
						],
						[
							296,
							160,
							3
						]
					].map(([cx, cy, r]) => /* @__PURE__ */ jsx("circle", {
						cx,
						cy,
						r
					}, `${cx}-${cy}`))
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "container fcta__inner",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "u-eyebrow fcta__eyebrow",
					children: finalCta.eyebrow
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "u-h2 fcta__headline",
					id: "contact-heading",
					children: finalCta.headline
				}),
				/* @__PURE__ */ jsx("p", {
					className: "u-lede u-secondary fcta__support",
					children: finalCta.support
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "fcta__actions",
					children: [/* @__PURE__ */ jsx(Button, {
						href: finalCta.primaryCta.href,
						variant: "primary",
						onDark: true,
						children: finalCta.primaryCta.label
					}), /* @__PURE__ */ jsx(Button, {
						href: finalCta.secondaryCta.href,
						variant: "quiet",
						onDark: true,
						children: finalCta.secondaryCta.label
					})]
				}),
				/* @__PURE__ */ jsx("a", {
					className: "fcta__email u-mono",
					href: `mailto:${finalCta.email}`,
					children: finalCta.email
				})
			]
		})]
	});
}
//#endregion
//#region src/components/pages/Pages.tsx
function PageHero({ eyebrow, title, support, body, display = false }) {
	return /* @__PURE__ */ jsx("section", {
		className: "pagehero field-inverse",
		id: "top",
		"aria-labelledby": "page-title",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container pagehero__inner",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "u-eyebrow sec-intro__eyebrow",
					children: [/* @__PURE__ */ jsx("span", {
						className: "sec-intro__marker",
						"aria-hidden": "true"
					}), eyebrow]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: display ? "u-display pagehero__title" : "u-h2 pagehero__title",
					id: "page-title",
					children: title
				}),
				support && /* @__PURE__ */ jsx("p", {
					className: "u-lede pagehero__support",
					children: support
				}),
				body && /* @__PURE__ */ jsx("p", {
					className: "u-body pagehero__support",
					children: body
				})
			]
		})
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ jsxs("p", {
		className: "u-eyebrow sec-intro__eyebrow",
		children: [/* @__PURE__ */ jsx("span", {
			className: "sec-intro__marker",
			"aria-hidden": "true"
		}), children]
	});
}
function ContentBlocks({ items, columns = 2, headingLevel = 3, link }) {
	const Heading = `h${headingLevel}`;
	return /* @__PURE__ */ jsx("div", {
		className: `content-grid content-grid--${columns}`,
		children: items.map((item) => /* @__PURE__ */ jsxs("article", {
			className: "content-block",
			children: [
				(item.eyebrow || item.index) && /* @__PURE__ */ jsx("p", {
					className: "u-eyebrow content-block__eyebrow",
					children: item.index ?? item.eyebrow
				}),
				/* @__PURE__ */ jsx(Heading, {
					className: "u-h3",
					children: item.title
				}),
				item.body && /* @__PURE__ */ jsx("p", {
					className: "u-body u-secondary",
					children: item.body
				}),
				link && /* @__PURE__ */ jsx("p", {
					className: "content-block__link",
					children: /* @__PURE__ */ jsx(Button, {
						href: link.href,
						variant: "quiet",
						children: link.label
					})
				})
			]
		}, `${item.eyebrow ?? item.index}-${item.title}`))
	});
}
function StackSection({ detailed = false }) {
	return /* @__PURE__ */ jsx("section", {
		className: "section field-brand",
		"aria-labelledby": "stack-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [
				/* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: "The stack",
					heading: "Four layers, one delivery.",
					id: "stack-heading"
				}),
				/* @__PURE__ */ jsx("ol", {
					className: "stack-list",
					children: stackLayers.map((layer) => /* @__PURE__ */ jsxs("li", {
						className: "stack-list__row",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "stack-list__name",
								children: layer.name
							}),
							/* @__PURE__ */ jsx("span", {
								className: "u-body stack-list__use",
								children: layer.use
							}),
							/* @__PURE__ */ jsx("span", {
								className: "u-mono stack-list__age",
								children: layer.age
							})
						]
					}, layer.name))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "u-lede stack-list__foot",
					children: detailed ? "Below all four sits the physical system: sensors, actuators, energy, time." : "Few firms work across all four."
				}),
				!detailed && /* @__PURE__ */ jsx("p", {
					className: "section-link",
					children: /* @__PURE__ */ jsx(Button, {
						href: routes.build.path,
						variant: "quiet",
						onDark: true,
						children: "How we build"
					})
				})
			]
		})
	});
}
function ProjectsGrid({ limit }) {
	const shownProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;
	const Heading = limit ? "h3" : "h2";
	return /* @__PURE__ */ jsx("div", {
		className: `project-grid${limit ? " project-grid--teasers" : ""}`,
		children: shownProjects.map((project, index) => /* @__PURE__ */ jsxs("article", {
			className: "project-card",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "project-card__top",
					children: [/* @__PURE__ */ jsx("p", {
						className: "u-mono project-card__number",
						children: String(index + 1).padStart(2, "0")
					}), /* @__PURE__ */ jsx("p", {
						className: "u-eyebrow project-card__meta",
						children: limit ? project.industry : `${project.client} · ${project.industry}`
					})]
				}),
				/* @__PURE__ */ jsx(Heading, {
					className: "u-h3 project-card__title",
					children: project.title
				}),
				!limit && /* @__PURE__ */ jsx("p", {
					className: "u-mono project-card__client",
					children: project.client
				})
			]
		}, project.title))
	});
}
function HomePage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-labelledby": "what-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: "What we do",
					heading: "Most conversations start in one of four places.",
					id: "what-heading"
				}), /* @__PURE__ */ jsx(ContentBlocks, {
					items: serviceEntryPoints.map((item) => ({
						eyebrow: item.eyebrow,
						title: item.heading,
						body: item.body
					})),
					link: {
						label: "Services",
						href: routes.services.path
					}
				})]
			})
		}),
		/* @__PURE__ */ jsx(StackSection, {}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-subtle",
			"aria-labelledby": "projects-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [
					/* @__PURE__ */ jsx(SectionIntro, {
						eyebrow: "Projects",
						heading: "Where the work has been done.",
						id: "projects-heading"
					}),
					/* @__PURE__ */ jsx(ProjectsGrid, { limit: 3 }),
					/* @__PURE__ */ jsx("p", {
						className: "section-link",
						children: /* @__PURE__ */ jsx(Button, {
							href: routes.projects.path,
							variant: "quiet",
							children: "See all projects"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-label": "Company facts",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [
					/* @__PURE__ */ jsx(SectionLabel, { children: proof.eyebrow }),
					/* @__PURE__ */ jsx("dl", {
						className: "proof-grid",
						children: proof.metrics.map((metric) => /* @__PURE__ */ jsxs("div", {
							className: "proof-grid__metric",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "u-small u-secondary",
								children: metric.label
							}), /* @__PURE__ */ jsx("dd", {
								className: "u-metric",
								children: metric.value
							})]
						}, metric.label))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "u-body u-secondary proof-grid__foot",
						children: proof.infrastructure
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function ServicesPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "Services",
			title: services.headline
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-labelledby": "starting-heading",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: services.startingPoint.eyebrow,
					heading: services.startingPoint.heading,
					intro: services.startingPoint.body,
					id: "starting-heading"
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-subtle",
			"aria-label": "How we start",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(SectionLabel, { children: "How we start" }), /* @__PURE__ */ jsx(ContentBlocks, {
					items: services.starts,
					columns: 3,
					headingLevel: 2
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-label": "How we engage",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [
					/* @__PURE__ */ jsx(SectionLabel, { children: "How we engage" }),
					/* @__PURE__ */ jsx(ContentBlocks, {
						items: services.engagements,
						headingLevel: 2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-link",
						children: /* @__PURE__ */ jsx(Button, {
							href: routes.build.path,
							variant: "quiet",
							children: "How we build"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function ProjectsPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "Projects",
			title: "Where the work has been done."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-label": "Projects",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(ProjectsGrid, {})
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function BuildPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "How we build",
			title: "AI for the physical world",
			support: build.support,
			body: build.intro,
			display: true
		}),
		/* @__PURE__ */ jsx(StackSection, { detailed: true }),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-labelledby": "origin-heading",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: build.origin.eyebrow,
					heading: build.origin.heading,
					intro: build.origin.body,
					id: "origin-heading"
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-subtle",
			"aria-labelledby": "trace-heading",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: build.traceability.eyebrow,
					heading: build.traceability.heading,
					intro: build.traceability.body,
					id: "trace-heading"
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-inverse",
			"aria-labelledby": "platform-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: build.platform.eyebrow,
					heading: build.platform.heading,
					id: "platform-heading"
				}), /* @__PURE__ */ jsx("div", {
					className: "platform-copy",
					children: build.platform.paragraphs.map((paragraph) => /* @__PURE__ */ jsx("p", {
						className: "u-body u-secondary platform-copy__item",
						children: paragraph
					}, paragraph))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-labelledby": "rarity-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [
					/* @__PURE__ */ jsx(SectionIntro, {
						eyebrow: build.rarity.eyebrow,
						heading: build.rarity.heading,
						intro: build.rarity.body,
						id: "rarity-heading"
					}),
					/* @__PURE__ */ jsx("blockquote", {
						className: "pull-quote",
						children: build.rarity.phrase
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-link",
						children: /* @__PURE__ */ jsx(Button, {
							href: routes.insights.path,
							variant: "quiet",
							children: "Read our engineering notes"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function ProductsPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "Products",
			title: products.headline
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-labelledby": "sympathy-heading",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(SectionIntro, {
					eyebrow: products.sympathy.eyebrow,
					heading: products.sympathy.heading,
					intro: products.sympathy.body,
					id: "sympathy-heading"
				}), /* @__PURE__ */ jsx("p", {
					className: "section-link",
					children: /* @__PURE__ */ jsx(Button, {
						href: products.sympathy.cta.href,
						variant: "quiet",
						children: products.sympathy.cta.label
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function InsightsPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Insights",
		title: "Engineering notes.",
		support: "Depth lives here and only here."
	}), /* @__PURE__ */ jsx(FinalCta, {})] });
}
function CompanyPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageHero, {
			eyebrow: "Company",
			title: "About Combine."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "section field-default",
			"aria-label": "Company facts",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx(SectionLabel, { children: "Combine" }), /* @__PURE__ */ jsxs("dl", {
					className: "proof-grid proof-grid--company",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "proof-grid__metric",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "u-small u-secondary",
								children: "Engineers"
							}), /* @__PURE__ */ jsx("dd", {
								className: "u-metric",
								children: "~40"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "proof-grid__metric",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "u-small u-secondary",
								children: "Hold a PhD"
							}), /* @__PURE__ */ jsx("dd", {
								className: "u-metric",
								children: "~20%"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "proof-grid__metric proof-grid__metric--text",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "u-small u-secondary",
								children: "Offices"
							}), /* @__PURE__ */ jsx("dd", { children: site.offices.join(" · ") })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(FinalCta, {})
	] });
}
function ContactPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PageHero, {
		eyebrow: "Contact",
		title: "Talk to an engineer."
	}), /* @__PURE__ */ jsx("section", {
		className: "section field-default",
		"aria-labelledby": "contact-heading",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container contact-layout",
			children: [/* @__PURE__ */ jsx(SectionIntro, {
				eyebrow: "What comes next",
				heading: "Tell us what is not working.",
				intro: "Start with the operation, the data or the decision that needs to improve.",
				id: "contact-heading",
				children: /* @__PURE__ */ jsx("p", {
					className: "section-link",
					children: /* @__PURE__ */ jsx(Button, {
						href: `mailto:${site.email}`,
						variant: "primary",
						children: site.email
					})
				})
			}), /* @__PURE__ */ jsxs("aside", {
				className: "contact-offices",
				"aria-labelledby": "offices-heading",
				children: [/* @__PURE__ */ jsx("p", {
					className: "u-eyebrow",
					id: "offices-heading",
					children: "Offices"
				}), /* @__PURE__ */ jsx("ul", {
					className: "u-h4",
					children: site.offices.map((office) => /* @__PURE__ */ jsx("li", { children: office }, office))
				})]
			})]
		})
	})] });
}
var pages = {
	home: HomePage,
	services: ServicesPage,
	projects: ProjectsPage,
	build: BuildPage,
	products: ProductsPage,
	insights: InsightsPage,
	company: CompanyPage,
	contact: ContactPage
};
function PageForRoute({ route }) {
	const Page = pages[route];
	return /* @__PURE__ */ jsx(Page, {});
}
//#endregion
//#region src/App.tsx
function PageMetadata({ route }) {
	useEffect(() => {
		const metadata = routes[route];
		document.title = metadata.title;
		document.querySelector("meta[name=\"description\"]")?.setAttribute("content", metadata.description);
		document.querySelector("link[rel=\"canonical\"]")?.setAttribute("href", new URL(metadata.path, site.url).toString());
	}, [route]);
	return null;
}
/**
* App receives a route as data. It does not inspect window during render, so
* the same component tree can be called by a future static or server renderer.
*/
function App({ route }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(PageMetadata, { route }),
		/* @__PURE__ */ jsx("a", {
			className: "skip-link",
			href: "#main",
			children: "Skip to content"
		}),
		/* @__PURE__ */ jsx(SiteHeader, { currentRoute: route }),
		/* @__PURE__ */ jsx("main", {
			id: "main",
			children: /* @__PURE__ */ jsx(PageForRoute, { route })
		}),
		/* @__PURE__ */ jsx(SiteFooter, {})
	] });
}
//#endregion
//#region src/entry-server.tsx
/**
* Shared server entry for either prerendering or request-time rendering.
* Route selection and metadata stay explicit so no server render needs a
* browser global.
*/
function render(route) {
	const metadata = routes[route];
	return {
		html: renderToString(/* @__PURE__ */ jsx(App, { route })),
		head: {
			title: metadata.title,
			description: metadata.description,
			canonical: new URL(metadata.path, site.url).toString()
		}
	};
}
//#endregion
export { render };
