<template>
  <div class="p-16 flex flex-col justify-center items-center">
    <h1 class="font-bold text-2xl mb-12">Cartão de Crédito</h1>
    <section class="flex space-x-10">
      <CreditCardForm
        @update-card="handleFormUpdate"
        @flip-card="handleCardFlip"
      />
      <CreditCardPreview
        :number="card.number"
        :name="card.name"
        :brand="card.brand"
        :expirationDate="card.expirationDate"
        :verificationCode="card.verificationCode"
        :face="cardFace"
        backgroundColor="#161616"
        textColor="#fff"
      />
    </section>
    <section>
      <h2 class="font-semibold text-xl mt-12 mb-4">Cartões para teste</h2>
      <ul class="space-y-2">
        <li>4012888888881881 (Visa)</li>
        <li>2223003122003222 (Mastercard)</li>
        <li>371449635398431 (Amex)</li>
        <li>6362970000457013 (Elo)</li>
        <li>6062823936268330 (Hipercard)</li>
        <li>36227206271667 (Diners)</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import CardForm from './components/CardForm.vue'
import CardPreview from './components/CardPreview.vue'
import CardBrand from './components/CardBrand.vue'
import { CreditCard, CardFace } from './components/types'

export default defineComponent({
  components: { CardForm, CardPreview, CardBrand },
  name: 'App',
  setup () {
    const card = reactive<CreditCard>({
      number: '',
      name: '',
      expirationDate: '',
      verificationCode: '',
      brand: ''
    })
    const cardFace = ref<CardFace>('front')

    const handleFormUpdate = (formCard: CreditCard) => {
      Object.assign(card, formCard)
    }

    const handleCardFlip = (side: CardFace) => {
      cardFace.value = side
    }

    return {
      handleFormUpdate,
      card,
      handleCardFlip,
      cardFace
    }
  }
})
</script>

<style></style>
