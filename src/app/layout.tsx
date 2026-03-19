import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ABOUT, CONTACT } from "@/data/content";
import "./globals.css";
import type React from "react";

// Define the base URL for SEO assets
const baseUrl = "https://davidyoung.co.za";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "David Young | Software Engineer",
		template: "%s | David Young",
	},
	description: `Personal website for ${ABOUT.name}, a ${ABOUT.role}.`,
	authors: [{ name: ABOUT.name }],
	keywords: [
		"David Young",
		"Software Engineer",
		"FERS",
		"Radar Simulator",
		"React",
		"Next.js",
		"Rust",
		"Portfolio",
	],
	icons: {
		icon: "/favicon.svg",
	},
	openGraph: {
		title: "David Young - Software Engineer & Researcher",
		description: "aspiring hawaiian shirt tech guy",
		url: baseUrl,
		siteName: "David Young Portfolio",
		locale: "en_ZA",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "David Young Website Preview",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "David Young - Software Engineer",
		description: "aspiring hawaiian shirt tech guy",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: ABOUT.name,
		jobTitle: ABOUT.role,
		url: baseUrl,
		sameAs: [`https://${CONTACT.github}`, `https://${CONTACT.linkedin}`],
		image: `${baseUrl}/og-image.png`,
	};
	return (
		<html lang="en">
			<body className="antialiased">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{children}

				<Analytics />
			</body>
		</html>
	);
}
