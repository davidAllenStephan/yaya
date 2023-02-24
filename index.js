import db from './firebaseConfig.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
import craft from './craft.js'
import sendImage from './sendImage.js'

const index = async () => {
	const s = await secrets()
	const secret = await login(s)
	const u = await user(secret)

	const sendorview = prompt('send or view? (s or v) ')
	if (sendorview == 's') {
		const path = prompt('path: ')
		const name = u.name
		const a = prompt('address: ')
		sendImage(path, a, name)
	} else {
		const images = await get(u.address)
		for (let i = 0; i < images.length; i++) {
			const cont = prompt('next image? (y or n) ')
			if (cont == 'y') {
				const ext = extract(images[i])
				craft(ext)
			} else {
				break
			}
			continue
		}
	}
	process.exit()
}

index()
