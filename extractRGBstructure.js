const extractRGBstructure = (data, width = 32, height = 32) => {
	const rgb = []
	const chars = data.split(',')
	for (let y = 0; y < height; y++) {
		const row = []
		let what = 0
		const color = {
			red: 0,
			green: 0,
			blue: 0,
		}
		for (let x = 0; x < width * 3; x++) {
			if (what === 0) {
				color.red = chars[x + y * 96]
			} else if (what === 1) {
				color.green = chars[x + y * 96]
			} else if (what === 2) {
				color.blue = chars[x + y * 96]
			}
			what++
			if (what === 3) {
				what = 0
				row.push({ ...color })
				color.red = 0
				color.green = 0
				color.blue = 0
			}
		}
		rgb.push([...row])
	}
	return rgb
}
export default extractRGBstructure
