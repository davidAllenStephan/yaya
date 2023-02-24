import db from "./firebaseConfig.js"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import craft from "./craft.js";
import getImageRGB from "./getImageRGB.js";
import readline from "readline"
import promptSync from 'prompt-sync'
const prompt = promptSync()

const rl = readline.createInterface(
	{
		input: process.stdin,
		output: process.stdout
	}
)

const create = async () => {
	await addDoc(collection(db, "users"), {
		secret: "seppi_marino",
		name: "Seppi Johan Phillip Marino",
		address: "3143820912"
	});
}

const log = async (path, address, sender) => {
	await addDoc(collection(db, "log"), {
		sender: sender,
		reciever_address: address,
		image: simplify(path)
	});
}

const get = async (address) => {
	const ref = collection(db, 'log')
	const q = query(ref, where('reciever_address', '==', address))
	const qs = await getDocs(q)
	const images = []
	qs.forEach((doc) => {
		const data = doc.data()
		const image = data.image
		images.push(image)
	})

	return images;
}


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

const extract = (data, width = 32, height = 32) => {
	const rgb = []
	const chars = data.split(',')
	for (let y = 0; y < height; y++) {
		const row = []
		let what = 0
		const color = {
			red: 0,
			green: 0,
			blue: 0
		}
		for (let x = 0; x < width * 3; x++) {
			if (what === 0) {
				color.red = chars[x + (y * 96)]
			} else if (what === 1) {
				color.green = chars[x + (y * 96)]
			} else if (what === 2) {
				color.blue = chars[x + (y * 96)]
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


const login = (secrets) => {

	const secret = prompt('Please enter your secret ')
	if (secrets.includes(secret)) {
		console.log("Success: logged in 👍")
		return secret
	} else {
		console.log("Failure: secret invalid please try again or make a secret ❌")
		login(secrets)
	}
}

const secrets = async () => {
	const ref = collection(db, 'users')
	const q = query(ref)
	const qs = await getDocs(q)
	const s = []
	qs.forEach((doc) => {
		const data = doc.data()
		const sdata = data.secret
		s.push(sdata)
	})
	return s;
}

const user = async (secret) => {
	const ref = collection(db, 'users')
	const q = query(ref, where('secret', '==', secret))
	const qs = await getDocs(q)
	let user
	qs.forEach((doc) => {
		const data = doc.data()
		user = data
	})
	return user
}

const index = async () => {

	const s = await secrets()
	const secret = login(s)
	const u = await user(secret)

	const sendorview = prompt('send or view? (s or v) ')
	if (sendorview == 's') {
		const path = prompt('path: ')
		const name = u.name
		const a = prompt('address: ')
		log(path, a, name)
	} else {
		const images = await get(u.address)
		for (let i = 0; i < images.length; i++) {
			const cont = prompt('next image? (y or n) ')
			if (cont == 'y') {
				const ext = extract(images[i])
				craft(ext)
			} else {
				break;
			}
			continue
		}
	}

	return 0;
}


index()