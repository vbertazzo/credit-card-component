interface Status {
	valid: boolean
	message?: string
}

export function isCardValid(cardNumber: string): Status {
	const sanitizedCardNumber = sanitizeNumber(cardNumber)
	const NUMBER_SIZE = sanitizedCardNumber.length - 1
	let shouldDouble = false
	let sum = 0

	if (sanitizedCardNumber.length < 13) {
		return {
			valid: false,
			message: 'Número de cartão precise ter ao menos 13 dígitos.'
		}
	}

	for (let i = NUMBER_SIZE; i >= 0; i--) {
		let digit = Number(sanitizedCardNumber.charAt(i))

		if (shouldDouble) {
			(digit *= 2) > 9 ? digit -= 9 : digit
		}

		sum += digit
		shouldDouble = !shouldDouble
	}

	if (!(sum % 10 === 0)) {
		return {
			valid: false,
			message: 'Número de cartão inválido.'
		}
	}

	return { valid: true }
}

export function sanitizeNumber(number: string): string {
	return number.replace(/\D/g, '')
}

interface BrandRegex {
	includes: RegExp
	excludes?: RegExp
}

export function identifyBrand(cardNumber: string): string | null {
	const brands: Record<string, BrandRegex> = {
		visa: { includes: /^4(?!38935|011|51416|576)\d{12}(?:\d{3})?$/, excludes: /^((451416)|(438935)|(40117[8-9])|(45763[1-2])|(457393)|(431274)|(402934))/ },
		mastercard: { includes: /^(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/, excludes: /^(514256|514586|526461|511309|514285|501059|557909|501082|589633|501060|501051|501016|589657|553839|525855|553777|553771|551792|528733|549180|528745|517562|511849|557648|546367|501070|601782|508143|501085|501074|501073|501071|501068|501066|589671|589633|588729|501089|501083|501082|501081|501080|501075|501067|501062|501061|501060|501058|501057|501056|501055|501054|501053|501051|501049|501047|501045|501043|501041|501040|501039|501038|501029|501028|501027|501026|501025|501024|501023|501021|501020|501018|501016|501015|589657|589562|501105|557039|542702|544764|550073|528824|522135|522137|562397|566694|566783|568382|569322|504363)/ },
		amex: { includes: /^((34)|(37))/ },
		elo: { includes: /^((509091)|(636368)|(636297)|(504175)|(438935)|(40117[8-9])|(45763[1-2])|(457393)|(431274)|(50990[0-2])|(5099[7-9][0-9])|(50996[4-9])|(509[1-8][0-9][0-9])|(5090(0[0-2]|0[4-9]|1[2-9]|[24589][0-9]|3[1-9]|6[0-46-9]|7[0-24-9]))|(5067(0[0-24-8]|1[0-24-9]|2[014-9]|3[0-379]|4[0-9]|5[0-3]|6[0-5]|7[0-8]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(6504(8[5-9]|9[0-9])|6505(0[0-9]|1[0-9]|2[0-9]|3[0-8]))|(6505(4[1-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(65072[0-7])|(6509(0[1-9]|1[0-9]|20))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[0-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8])))/ },
		hipercard: { includes: /^((606282)|(637095)|(637568)|(637599)|(637609)|(637612))/ },
		diners: { includes: /^(36)/ }
	}

	const sanitizedCardNumber = sanitizeNumber(cardNumber)

	for (const brand in brands) {
		if (brands[brand].includes.test(sanitizedCardNumber) && !brands[brand].excludes?.test(sanitizedCardNumber)) {
			return brand
		}
	}
	return null
}

export function isVerificationCodeValid(cardNumber: string, code: string): Status {
	const brands: Record<string, RegExp> = {
		visa: /^\d{3}$/,
		mastercard: /^\d{3}$/,
		amex: /^\d{3,4}$/,
		elo: /^\d{3}$/,
		hipercard: /^\d{3}$/,
		diners: /^\d{3}$/,
	}

	const sanitizedCardNumber = sanitizeNumber(cardNumber)
	const sanitizedCode = sanitizeNumber(code)

	const brand = identifyBrand(sanitizedCardNumber)

	if (brand && !brands[brand].test(sanitizedCode)) {
		return {
			valid: false,
			message: 'Por favor, verifique se a quantidade de digitos do código de verificação está correta.'
		}
	}

	return { valid: true }
}

export function isNameValid(name: string): Status {
	const MIN_LENGTH = 2
	const MAX_LENGTH = 50
	const isBetweenMinMax = name.length >= MIN_LENGTH && name.length <= MAX_LENGTH
	if (!isBetweenMinMax) {
		return {
			valid: false,
			message: 'Por favor, o nome precisa ter entre 2 e 50 caracteres.'
		}
	}
	return { valid: true }
}

export function isExpirationDateValid(date: string): Status {
	if (!/^(0[1-9]|1[0-2])\/([0-9]{4})$/.test(date)) {
		return {
			valid: false,
			message: 'Data de vencimento inválida.'
		}
	}

	return { valid: true }
}
