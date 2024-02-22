export const parseText = (text: string) => {
	const pattern = /<[^>]*>/g

	return text.replace(pattern, "")
}

export const parseAllText = (arrOfText: string[]) => {

	return arrOfText.map(text => parseText(text))
}