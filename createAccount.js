import { collection, addDoc } from 'firebase/firestore'
const createAccount = async (name, secret, address) => {
	await addDoc(collection(db, 'users'), {
		secret: secret,
		name: name,
		address: address,
	})
}
export default createAccount
