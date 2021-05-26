export interface CreditCard {
	number: string
	name: string
	expirationDate: string
	verificationCode: string
	brand: string
}

export type CardFace = 'front' | 'back'