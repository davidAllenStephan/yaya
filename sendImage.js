import { collection, addDoc } from 'firebase/firestore'
import db from './firebaseConfig.js'
import simplifyImage from './simplifyImage.js'
const sendImage = async (path, address, sender) => {
	await addDoc(collection(db, 'log'), {
		sender: sender,
		reciever_address: address,
		image: simplifyImage(path),
	})
}
export default sendImage
