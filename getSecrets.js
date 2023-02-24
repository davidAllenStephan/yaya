import { collection, getDocs, query } from 'firebase/firestore'
import db from './firebaseConfig.js'
const getSecrets = async () => {
	const ref = collection(db, 'users')
	const q = query(ref)
	const qs = await getDocs(q)
	const s = []
	qs.forEach((doc) => {
		const data = doc.data()
		const sdata = data.secret
		s.push(sdata)
	})
	return s
}
export default getSecrets
