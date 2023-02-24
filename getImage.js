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
	return images
}

export default get
