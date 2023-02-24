import { collection, addDoc } from 'firebase/firestore'
import db from './firebaseConfig'
const sendImage = async (path, address, sender) => {
	await addDoc(collection(db, 'log'), {
		sender: sender,
		reciever_address: address,
		image: simplify(path),
	})
}
export default sendImage
