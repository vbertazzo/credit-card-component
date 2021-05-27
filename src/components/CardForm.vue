<template>
  <form class="space-y-4">
    <div class="flex flex-col">
      <label for="card-name">Nome do Titular</label>
      <FormInput
        name="card-name"
        v-model="name"
        :error="nameStatus.message"
        @focus="handleFocus('front')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-number">Número do Cartão</label>
      <FormInput
        name="card-number"
        v-model="number"
        :error="numberStatus.message"
        @focus="handleFocus('back')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-expiration-date">Data de Vencimento</label>
      <FormInput
        name="card-expiration-date"
        v-model="expirationDate"
        :error="expirationDateStatus.message"
        @focus="handleFocus('back')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-verification-code">Código de Segurança</label>
      <FormInput
        name="card-verification-code"
        v-model="verificationCode"
        :error="verificationCodeStatus.message"
        @focus="handleFocus('back')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import FormInput from './FormInput.vue'
import { CreditCard } from './types'
import {
  identifyBrand,
  isNameValid,
  isCardValid,
  isExpirationDateValid,
  isVerificationCodeValid
} from './validators'

export default defineComponent({
  name: 'CardForm',
  components: { FormInput },
  emits: ['update-card', 'flip-card'],
  setup (_, ctx) {
    const card = reactive<CreditCard>({
      number: '4012888888881881',
      name: 'Mionel Lessi',
      expirationDate: '09/2028',
      verificationCode: '449',
      brand: ''
    })

    const handleFocus = (side: 'front' | 'back') => {
      ctx.emit('flip-card', side)
    }

    const cardBrand = computed(() => {
      return identifyBrand(card.number)
    })

    const nameStatus = computed(() => {
      return isNameValid(card.name)
    })

    const numberStatus = computed(() => {
      return isCardValid(card.number)
    })

    const expirationDateStatus = computed(() => {
      return isExpirationDateValid(card.expirationDate)
    })

    const verificationCodeStatus = computed(() => {
      return isVerificationCodeValid(card.number, card.verificationCode)
    })

    watch(
      () => [{ ...card }],
      () => {
        ctx.emit('update-card', { ...card, brand: cardBrand.value ?? '' })
      },
      { immediate: true }
    )

    return {
      ...toRefs(card),
      handleFocus,
      nameStatus,
      numberStatus,
      expirationDateStatus,
      verificationCodeStatus
    }
  }
})
</script>
