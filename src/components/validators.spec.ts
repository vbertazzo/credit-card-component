import { identifyBrand, isCardValid, isExpirationDateValid, isNameValid, isVerificationCodeValid, sanitizeNumber } from './validators'

describe('Card number validation', () => {
	it('returns true when card is valid', () => {
		expect(isCardValid('4012888888881881')).toBe(true)
	})

	it('returns false when card is invalid', () => {
		expect(isCardValid('4242424242424241')).toBe(false)
	})

	it('returns only the card digits', () => {
		expect(sanitizeNumber('4012-8888-8888-1881')).toBe('4012888888881881')
	})
})

describe('Card brand identification', () => {
	it('identifies card brand as visa', () => {
		expect(identifyBrand('4012888888881881')).toBe('visa')
		expect(identifyBrand('4000000760000002')).toBe('visa')
	})

	it('identifies card brand as mastercard', () => {
		expect(identifyBrand('5555555555554444')).toBe('mastercard')
		expect(identifyBrand('5200828282828210')).toBe('mastercard')
		expect(identifyBrand('5105105105105100')).toBe('mastercard')
		expect(identifyBrand('2223003122003222')).toBe('mastercard')
	})

	it('identifies card brand as american express', () => {
		expect(identifyBrand('378282246310005')).toBe('amex')
		expect(identifyBrand('371449635398431')).toBe('amex')
	})

	it('identifies card brand as elo', () => {
		expect(identifyBrand('6362970000457013')).toBe('elo')
	})

	it('identifies card brand as hipercard', () => {
		expect(identifyBrand('6062825624254001')).toBe('hipercard')
		expect(identifyBrand('6062823936268330')).toBe('hipercard')
	})

	it('identifies card brand as diners', () => {
		expect(identifyBrand('36227206271667')).toBe('diners')
	})

	it('returns null when not identifiable', () => {
		expect(identifyBrand('9912888888881881')).toBe(null)
	})
})

describe('Verification code validation', () => {
	it('returns true when verification code is valid', () => {
		const { number, verificationCode } = {
			number: '4242424242424242',
			verificationCode: '123'
		}
		expect(isVerificationCodeValid(number, verificationCode)).toBe(true)
	})

	it('returns false when verification code is invalid', () => {
		const { number, verificationCode } = {
			number: '4242424242424242',
			verificationCode: '4803'
		}
		expect(isVerificationCodeValid(number, verificationCode)).toBe(false)
	})
})

describe('Name validation', () => {
	it('returns true when name length is valid', () => {
		expect(isNameValid('Mionel Lessi')).toBe(true)
	})

	it('returns false when name length is invalid', () => {
		expect(isNameValid('')).toBe(false)

		const longName = 'a'.repeat(51)
		expect(isNameValid(longName)).toBe(false)
	})
})

describe('Expiration date validation', () => {
	it('returns true when expiration date is valid', () => {
		expect(isExpirationDateValid('04/2029')).toBe(true)
	})

	it('returns false when expiration date is invalid', () => {
		expect(isExpirationDateValid('04/29')).toBe(false)
		expect(isExpirationDateValid('2/2029')).toBe(false)
		expect(isExpirationDateValid('0429')).toBe(false)
		expect(isExpirationDateValid('04-29')).toBe(false)
	})
})