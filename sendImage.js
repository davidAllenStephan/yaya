import { collection, addDoc } from 'firebase/firestore'
const log = async (path, address, sender) => {
	await addDoc(collection(db, 'log'), {
		sender: sender,
		reciever_address: address,
		image: simplify(path),
	})
}
export default log
