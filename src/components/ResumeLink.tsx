"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { ABOUT } from "@/data/content";
import ResumeDocument from "./ResumeDocument";

export default function ResumeLink() {
	const buttonClass =
		"rounded-lg border border-black px-6 py-3 font-medium text-black transition-colors hover:bg-gray-100";

	return (
		<PDFDownloadLink
			document={<ResumeDocument />}
			fileName={`${ABOUT.name.replace(" ", "_")}_Resume.pdf`}
			className={buttonClass}
		>
			{({ loading }) => (loading ? "Generating..." : "Download Resume")}
		</PDFDownloadLink>
	);
}
