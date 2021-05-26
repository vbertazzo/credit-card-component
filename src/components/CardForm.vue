<template>
  <form class="space-y-4">
    <div class="flex flex-col">
      <label for="card-name">Nome do Titular</label>
      <input
        type="text"
        id="card-name"
        class="mt-2 border rounded"
        v-model="name"
        @focus="handleFocus('front')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-number">Número do Cartão</label>
      <input
        type="text"
        id="card-number"
        class="mt-2 border rounded"
        v-model="number"
        @focus="handleFocus('back')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-expiration-date">Data de Vencimento</label>
      <input
        type="text"
        id="card-expiration-date"
        class="mt-2 border rounded"
        v-model="expirationDate"
        @focus="handleFocus('back')"
      />
    </div>
    <div class="flex flex-col">
      <label for="card-security-code">Código de Segurança</label>
      <input
        type="text"
        id="card-security-code"
        class="mt-2 border rounded"
        v-model="verificationCode"
        @focus="handleFocus('back')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { CreditCard } from './types'
import { identifyBrand } from './validators'

export default defineComponent({
  name: 'CardForm',
  emits: ['update-card', 'flip-card'],
  setup (_, ctx) {
    const card = reactive<CreditCard>({
      number: '4012888888881881',
      name: 'Mionel Lessi',
      expirationDate: '09/28',
      verificationCode: '449',
      brand: ''
    })

    const handleFocus = (side: 'front' | 'back') => {
      ctx.emit('flip-card', side)
    }

    const cardBrand = computed(() => {
      return identifyBrand(card.number)
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
      handleFocus
    }
  }
})
</script>
