const MERMAID_LANGUAGE_CLASS = "language-mermaid";

function isElement(node, tagName) {
	return node?.type === "element" && node.tagName === tagName;
}

function getClassList(properties = {}) {
	const { className } = properties;

	if (Array.isArray(className)) {
		return className.filter((name) => typeof name === "string");
	}

	if (typeof className === "string") {
		return className.split(/\s+/).filter(Boolean);
	}

	return [];
}

function addClass(properties = {}, classToAdd) {
	const classList = getClassList(properties);

	if (!classList.includes(classToAdd)) {
		classList.push(classToAdd);
	}

	return classList;
}

function toText(node) {
	if (!node || typeof node !== "object") {
		return "";
	}

	if (node.type === "text") {
		return node.value ?? "";
	}

	if (!Array.isArray(node.children)) {
		return "";
	}

	return node.children.map(toText).join("");
}

function visit(node, visitor) {
	if (!node || typeof node !== "object") {
		return;
	}

	visitor(node);

	if (!Array.isArray(node.children)) {
		return;
	}

	for (const child of node.children) {
		visit(child, visitor);
	}
}

export default function rehypeMermaid() {
	return (tree) => {
		visit(tree, (node) => {
			if (!isElement(node, "pre") || node.children?.length !== 1) {
				return;
			}

			const code = node.children[0];
			if (
				!isElement(code, "code") ||
				!getClassList(code.properties).includes(MERMAID_LANGUAGE_CLASS)
			) {
				return;
			}

			node.properties = {
				...node.properties,
				className: addClass(node.properties, "mermaid"),
			};
			node.children = [{ type: "text", value: toText(code).trimEnd() }];
		});
	};
}
