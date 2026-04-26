import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { ABOUT } from "@/data/content";
import ResumeDocument from "@/lib/ResumePDF";

export const prerender = true;

const sharedCacheMaxAge = 60 * 60 * 24;

let resumePdfBuffer: Promise<Buffer> | undefined;

const getResumePdfBuffer = () => {
	resumePdfBuffer ??= renderToBuffer(React.createElement(ResumeDocument));
	return resumePdfBuffer;
};

export async function GET() {
	const buffer = await getResumePdfBuffer();
	const filename = `${ABOUT.name.replace(" ", "_")}_Resume.pdf`;
	return new Response(new Uint8Array(buffer), {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${filename}"`,
			"Cache-Control": `public, max-age=0, s-maxage=${sharedCacheMaxAge}, stale-while-revalidate=${sharedCacheMaxAge}`,
		},
	});
}
