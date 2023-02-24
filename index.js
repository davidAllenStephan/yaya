import promptSync from 'prompt-sync'
const prompt = promptSync()
import craft from './craft.js'
import sendImage from './sendImage.js'
import getSecrets from './getSecrets.js'
import login from './login.js'
import getUser from './getUser.js'
import getImage from './getImage.js'
import extractRGBstructure from './extractRGBstructure.js'

const index = async () => {
	const s = await getSecrets()
	const secret = await login(s)
	const u = await getUser(secret)
	const sendorview = prompt('send or view? (s or v) ')
	if (sendorview == 's') {
		const path = prompt('path: ')
		const name = u.name
		const a = prompt('address: ')
		await sendImage(path, a, name)
	} else {
		const images = await getImage(u.address)
		for (let i = 0; i < images.length; i++) {
			const cont = prompt('next image? (y or n) ')
			if (cont == 'y') {
				const ext = extractRGBstructure(images[i])
				craft(ext)
			} else {
				break
			}
			continue
		}
	}
	process.exit()
}

export default index
