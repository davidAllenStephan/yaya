import db from './firebaseConfig.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
const getUser = async (secret) => {
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

export default getUser
