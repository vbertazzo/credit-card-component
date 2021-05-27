import { ComponentPublicInstance } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import CardPreview from './CardPreview.vue'

describe('CardPreview', () => {
	let wrapper: VueWrapper<ComponentPublicInstance>

	beforeEach(() => {
		wrapper = mount(CardPreview, {
			props: {
				number: '4203241023404932',
				name: 'Mionel Lessi',
				expirationDate: '09/28',
				verificationCode: '449',
				brand: '',
				backgroundColor: '#67CE94',
				textColor: '#FFF',
			}
		})
	})

	it('displays name on card preview', async () => {
		expect(wrapper.find('[data-test="name"]').text()).toBe('Mionel Lessi')
	})

	it('displays number on card preview', () => {
		expect(wrapper.find('[data-test="number"]').text()).toBe('4203 2410 2340 4932')
	})

	it('displays expiration date on card preview', () => {
		expect(wrapper.find('[data-test="expiration-date"]').text()).toBe('09 / 28')
	})

	it('displays verification code on card preview', () => {
		expect(wrapper.find('[data-test="verification-code"]').text()).toBe('449')
	})

	it('displays correct color on card preview elements', () => {
		const backgroundcolorRGB = 'RGB(103, 206, 148)'
		const textColor = '#FFF'
		const textColorRGB = 'rgb(255, 255, 255)'

		const card = wrapper.find('[data-test="card"]')
		expect(card.attributes().style.toUpperCase()).toContain(textColor)

		const front = wrapper.find('[data-test="card-front"]')
		expect(front.attributes().style.toUpperCase()).toContain(backgroundcolorRGB)

		const back = wrapper.find('[data-test="card-back"]')
		expect(back.attributes().style.toUpperCase()).toContain(backgroundcolorRGB)

		const chip = wrapper.findAll('[data-test="chip"]')
		expect(chip[0].attributes().style.toUpperCase()).toContain(textColor)
		expect(chip[1].attributes().style.toUpperCase()).toContain(textColor)

		const name = wrapper.find('[data-test="name"]')
		expect(name.attributes().style).toContain(textColorRGB)

		const number = wrapper.find('[data-test="number"]')
		expect(number.attributes().style).toContain(textColorRGB)

		const expirationDate = wrapper.find('[data-test="expiration-date"]')
		expect(expirationDate.attributes().style).toContain(textColorRGB)

		const verificationCode = wrapper.find('[data-test="verification-code"]')
		expect(verificationCode.attributes().style).toContain(textColorRGB)
	})
})