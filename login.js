import promptSync from 'prompt-sync'
const prompt = promptSync()

const login = async (secrets) => {
	const logreg = prompt('Login or Register? (l or r) ')
	if (logreg === 'r') {
		const name = prompt('Name: ')
		const secret = prompt('Secret: ')
		const address = prompt('Address: ')
		await account(name, secret, address)
	} else if (logreg === 'l') {
		const secret = prompt('Please enter your secret ')
		if (secrets.includes(secret)) {
			console.log('Success: logged in 👍')
			return secret
		} else {
			console.log('Failure: secret invalid please try again or make a secret ❌')
			login(secrets)
		}
	} else {
		console.log('Failure: please input l or r ❌')
		login(secrets)
	}
}

export default login
