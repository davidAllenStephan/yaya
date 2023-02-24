import getImageRGB from './getImageRGB'
const simplify = (path) => {
	const data = getImageRGB(path)
	let output = ''
	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			output += data[y][x].red
			output += ','
			output += data[y][x].green
			output += ','
			output += data[y][x].blue
			output += ','
		}
	}
	return output
}

export default simplify
