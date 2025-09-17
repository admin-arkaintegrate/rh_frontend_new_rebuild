export function formatCellContent(content, sliceCount = 20) {
	if (typeof content !== 'string') {
		return { display: content, tooltip: null };
	}

	return content.length > sliceCount
		? { display: content.slice(0, sliceCount) + '...', tooltip: content }
		: { display: content, tooltip: null };
} 