import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ABOUT } from "@/data/content";
import ResumeDocument from "@/lib/ResumePDF";

export async function GET() {
	const buffer = await renderToBuffer(React.createElement(ResumeDocument));
	const filename = `${ABOUT.name.replace(" ", "_")}_Resume.pdf`;
	return new Response(new Uint8Array(buffer), {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${filename}"`,
		},
	});
}
