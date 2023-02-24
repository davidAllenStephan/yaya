import db from "./firebaseConfig.js"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import craft from "./craft.js";
import pkg from 'crypto-js';
import getImageRGB from "./getImageRGB.js";
const { AES, enc } = pkg;



const create = async () => {
	await addDoc(collection(db, "users"), {
		secret: "seppi_marino",
		name: "Seppi Johan Phillip Marino",
		address: "3143820912"
	});
}

const log = async () => {
	await addDoc(collection(db, "log"), {
		sender: "Seppi Johan Phillip Marino",
		reciever_address: "3147970321",
		image: simplify()
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


const simplify = () => {
	const data = getImageRGB()
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
	console.log(chars)
	return rgb
}


const index = async () => {

	const data = await get('3147970321')
	const rgb = extract(data[0], 32, 32)
	craft(rgb)
	craft(getImageRGB())

	return 0;
}


index()