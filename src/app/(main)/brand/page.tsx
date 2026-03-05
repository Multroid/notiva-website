import { SwatchIcon as Palette, ArrowDownTrayIcon as Download, DocumentTextIcon as FileText, LanguageIcon as Type } from "@heroicons/react/24/solid";
import Image from "next/image";
import { NotivaButtonLink } from "@/components/ui/notiva-button";

const colors = [
	{ name: "Notiva Blue", hex: "#0047BA", text: "white" },
	{ name: "Notiva Blue Dark", hex: "#00336C", text: "white" },
	{ name: "Multroid Blue", hex: "#0033A1", text: "white" },
	{ name: "Notiva Blue Light", hex: "#D9E3F5", text: "#0047BA" },
	{ name: "Border Blue", hex: "#B0C6EA", text: "#0047BA" },
	{ name: "Orange CTA", hex: "#F05627", text: "white" },
	{ name: "Off-White", hex: "#F0EEE9", text: "#101113" },
	{ name: "Multroid White", hex: "#FEFDFD", text: "#101113" },
	{ name: "Grey Dark", hex: "#67696B", text: "white" },
	{ name: "Grey", hex: "#898C8E", text: "white" },
	{ name: "Grey Light", hex: "#F3F4F4", text: "#101113" },
	{ name: "Black", hex: "#101113", text: "white" },
	{ name: "Green (Savings)", hex: "#009966", text: "white" },
];

export default function BrandPage() {
	return (
		<div className="min-h-screen">
			{/* Hero */}
			<section className="py-20 text-center">
				<div className="container mx-auto px-4">
					<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#D9E3F5] text-[#0047BA] ring-1 ring-[#B0C6EA] mb-6">
						<Palette className="size-8" />
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047BA]">Brand Guidelines</h1>
					<p className="text-xl text-[var(--multroid-grey-dark)] max-w-2xl mx-auto">
						Logos, colors, typography, and usage rules for the Notiva and Multroid brands.
					</p>
				</div>
			</section>

			{/* Logos */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Logos</h2>
					<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
						{/* Notiva Logo - Light BG */}
						<div className="rounded-[12px] border border-[#B0C6EA] bg-white p-8">
							<div className="bg-[#F3F4F4] rounded-[12px] p-12 flex items-center justify-center gap-4 mb-6">
								<div className="bg-[#0047BA] rounded-[8px] p-[10px] flex items-center justify-center">
									<Image src="/Logo/Notiva Logo transparent white.svg" alt="Notiva Logo" width={32} height={32} />
								</div>
								<span className="text-[28px] font-bold uppercase tracking-[2px] text-[#0047BA]">Notiva</span>
							</div>
							<h3 className="font-semibold mb-1">Notiva \u2014 Light Background</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">Primary logo for use on white or light backgrounds.</p>
						</div>

						{/* Notiva Logo - Dark BG */}
						<div className="rounded-[12px] border border-[#B0C6EA] bg-white p-8">
							<div className="bg-[#0047BA] rounded-[12px] p-12 flex items-center justify-center gap-4 mb-6">
								<div className="bg-white/20 rounded-[8px] p-[10px] flex items-center justify-center">
									<Image src="/Logo/Notiva Logo transparent white.svg" alt="Notiva Logo" width={32} height={32} />
								</div>
								<span className="text-[28px] font-bold uppercase tracking-[2px] text-[#F0EEE9]">Notiva</span>
							</div>
							<h3 className="font-semibold mb-1">Notiva \u2014 Dark Background</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">Reversed logo for use on blue or dark backgrounds.</p>
						</div>

						{/* Notiva Icon */}
						<div className="rounded-[12px] border border-[#B0C6EA] bg-white p-8">
							<div className="bg-[#F3F4F4] rounded-[12px] p-12 flex items-center justify-center mb-6">
								<div className="bg-[#0047BA] rounded-[12px] p-[14px] flex items-center justify-center">
									<Image src="/Logo/Notiva Logo transparent white.svg" alt="Notiva Icon" width={40} height={40} />
								</div>
							</div>
							<h3 className="font-semibold mb-1">App Icon</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">For app icons, favicons, and small spaces.</p>
						</div>

						{/* Multroid Logo */}
						<div className="rounded-[12px] border border-[#B0C6EA] bg-white p-8">
							<div className="bg-[#F3F4F4] rounded-[12px] p-12 flex items-center justify-center mb-6">
								<Image src="/Multroid-assets/Multroid Logo Social 600.svg" alt="Multroid Logo" width={64} height={64} className="rounded-[12px]" />
							</div>
							<h3 className="font-semibold mb-1">Multroid Logo</h3>
							<p className="text-sm text-[var(--multroid-grey-dark)]">Parent company logo. Used in company and press contexts.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Colors */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Color Palette</h2>
					<div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{colors.map((color) => (
							<div key={color.hex} className="rounded-[12px] border border-[#B0C6EA] bg-white overflow-hidden">
								<div
									className="h-20 flex items-end p-3"
									style={{ backgroundColor: color.hex, color: color.text }}
								>
									<span className="text-xs font-mono font-semibold">{color.hex}</span>
								</div>
								<div className="p-3">
									<p className="text-sm font-semibold">{color.name}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Typography */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Typography</h2>
					<div className="max-w-4xl mx-auto rounded-[12px] border border-[#B0C6EA] bg-white p-8 md:p-12">
						<div className="flex items-center gap-4 mb-8">
							<div className="size-14 rounded-[12px] bg-[#D9E3F5] text-[#0047BA] flex items-center justify-center">
								<Type className="size-7" />
							</div>
							<div>
								<h3 className="text-xl font-bold">Montserrat</h3>
								<p className="text-sm text-[var(--multroid-grey-dark)]">Primary typeface \u2014 all weights from Regular (400) to Black (900)</p>
							</div>
						</div>

						<div className="space-y-6 border-t border-[#B0C6EA] pt-8">
							<div>
								<p className="text-xs text-[var(--multroid-grey)] mb-1 font-mono">Black 900 / 80px \u2014 Hero Headlines</p>
								<p className="text-[48px] md:text-[64px] font-black text-[#0047BA] leading-tight">Your AI Financial Friend</p>
							</div>
							<div>
								<p className="text-xs text-[var(--multroid-grey)] mb-1 font-mono">Bold 700 / 32px \u2014 Section Headings</p>
								<p className="text-[32px] font-bold">Features that keep you ahead</p>
							</div>
							<div>
								<p className="text-xs text-[var(--multroid-grey)] mb-1 font-mono">SemiBold 600 / 16px \u2014 Buttons & Labels</p>
								<p className="text-[16px] font-semibold">Get Started Free</p>
							</div>
							<div>
								<p className="text-xs text-[var(--multroid-grey)] mb-1 font-mono">Regular 400 / 20px \u2014 Body Text</p>
								<p className="text-[20px] font-normal text-[var(--multroid-grey-dark)]">Your accounts, invoices, subscriptions, and taxes \u2014 all in one place.</p>
							</div>
							<div>
								<p className="text-xs text-[var(--multroid-grey)] mb-1 font-mono">Regular 400 / 12px \u2014 Micro Text & Badges</p>
								<p className="text-[12px] font-normal text-[var(--multroid-grey-dark)]">GDPR compliant by design \u2022 AES-256 encryption \u2022 Data hosted in Germany</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Button System */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Button System</h2>
					<div className="max-w-4xl mx-auto rounded-[12px] border border-[#B0C6EA] bg-white p-8 md:p-12">
						<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
							<div className="space-y-3">
								<p className="text-xs text-[var(--multroid-grey)] font-mono">Primary</p>
								<NotivaButtonLink href="#" variant="primary" size="lg">Primary Action</NotivaButtonLink>
							</div>
							<div className="space-y-3">
								<p className="text-xs text-[var(--multroid-grey)] font-mono">Secondary</p>
								<NotivaButtonLink href="#" variant="secondary" size="lg">Secondary Action</NotivaButtonLink>
							</div>
							<div className="space-y-3">
								<p className="text-xs text-[var(--multroid-grey)] font-mono">Important (CTA)</p>
								<NotivaButtonLink href="#" variant="important" size="lg">Important CTA</NotivaButtonLink>
							</div>
						</div>
						<p className="text-sm text-[var(--multroid-grey-dark)] mt-8 pt-6 border-t border-[#B0C6EA]">
							All buttons use the double-border system: outer container with 4px padding and rounded-[4px], inner element with rounded-[8px] and shadow. See <code className="font-mono text-xs bg-[#F3F4F4] px-1.5 py-0.5 rounded">globals.css</code> for full implementation.
						</p>
					</div>
				</div>
			</section>

			{/* Usage Rules */}
			<section className="py-20 bg-[#FAFAF8]">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-[#0047BA]">Usage Rules</h2>
					<div className="max-w-3xl mx-auto space-y-6">
						{[
							{ rule: "Always use the Notiva blue (#0047BA) as the primary brand color", type: "do" },
							{ rule: "Maintain clear space around the logo equal to the height of the icon mark", type: "do" },
							{ rule: "Use Montserrat as the only typeface across all materials", type: "do" },
							{ rule: "Don\u2019t alter the logo colors, proportions, or orientation", type: "dont" },
							{ rule: "Don\u2019t place the logo on busy backgrounds without a container", type: "dont" },
							{ rule: "Don\u2019t use the orange CTA color (#F05627) for non-interactive elements", type: "dont" },
						].map((item) => (
							<div
								key={item.rule}
								className={`rounded-[12px] p-5 border bg-white flex items-start gap-4 ${
									item.type === "do" ? "border-[#009966]" : "border-[#F05627]"
								}`}
							>
								<span
									className={`text-xs font-bold uppercase px-2 py-1 rounded shrink-0 ${
										item.type === "do"
											? "bg-[#E6F5EE] text-[#009966]"
											: "bg-[#FEE9EB] text-[#F05627]"
									}`}
								>
									{item.type === "do" ? "Do" : "Don\u2019t"}
								</span>
								<p className="text-sm text-[var(--multroid-grey-dark)]">{item.rule}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Download CTA */}
			<section className="py-20 bg-[#0047BA]">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4 text-[#F0EEE9]">Need brand assets?</h2>
					<p className="text-xl text-[#B0C6EA] mb-8 max-w-2xl mx-auto">
						For press kits, partnership materials, or media requests, get in touch.
					</p>
					<NotivaButtonLink href="mailto:press@multroid.com" variant="important" size="lg">
						Contact Press Team
					</NotivaButtonLink>
				</div>
			</section>
		</div>
	);
}
