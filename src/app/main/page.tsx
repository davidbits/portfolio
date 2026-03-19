import type { Metadata } from "next";
import AwardsVolunteering from "@/components/AwardsVolunteering";
import ContactSection from "@/components/ContactSection";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Interests from "@/components/Interests";
import ProjectsGrid from "@/components/ProjectsGrid";
import Skills from "@/components/Skills";
import { ABOUT, PROJECTS, SKILLS } from "@/data/content";

export const metadata: Metadata = {
	title: "Developer Portfolio",
	description: `The professional portfolio for ${ABOUT.name}, a ${ABOUT.role}. Showcasing skills in ${SKILLS.languages.join(", ")}, and more.`,
};

export default function PortfolioPage() {
	return (
		<div className="mx-auto max-w-4xl bg-white p-8 font-sans text-gray-800">
			<Header />

			<main className="space-y-16">
				<Experience />

				<section id="projects" aria-labelledby="projects-heading">
					<h2
						id="projects-heading"
						className="mb-6 border-b pb-2 text-3xl font-semibold"
					>
						Featured Projects
					</h2>
					<ProjectsGrid projects={PROJECTS} />
				</section>

				<Skills />
				<Education />
				<AwardsVolunteering />
				<Interests />
				<ContactSection />
			</main>

			<Footer />
		</div>
	);
}
