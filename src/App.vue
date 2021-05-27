<template>
  <main class="p-20 flex flex-col items-center">
    <h1 class="font-bold text-2xl mb-12">Cartão de Crédito</h1>
    <div class="w-full max-w-xl flex justify-between">
      <section class="w-full flex flex-col justify-between">
        <CardForm @update-card="handleFormUpdate" @flip-card="handleCardFlip" />
        <div class="flex flex-col">
          <h2 class="font-semibold text-xl mb-4">Cartões para teste</h2>
          <ul class="space-y-2">
            <li>4012888888881881 (Visa)</li>
            <li>2223003122003222 (Mastercard)</li>
            <li>371449635398431 (Amex)</li>
            <li>6362970000457013 (Elo)</li>
            <li>6062823936268330 (Hipercard)</li>
            <li>36227206271667 (Diners)</li>
          </ul>
        </div>
      </section>
      <aside class="flex flex-col">
        <CardPreview
          :number="card.number"
          :name="card.name"
          :brand="card.brand"
          :expirationDate="card.expirationDate"
          :verificationCode="card.verificationCode"
          :face="cardFace"
          :backgroundColor="backgroundColor"
          :textColor="textColor"
        />
        <div class="flex flex-col mt-12">
          <h2 class="font-semibold text-xl mb-4">Cores</h2>
          <ColorPicker
            @change-color="handleColorChange"
            :backgroundColor="backgroundColor"
            :textColor="textColor"
          />
        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import CardForm from './components/CardForm.vue'
import CardPreview from './components/CardPreview.vue'
import CardBrand from './components/CardBrand.vue'
import ColorPicker from './components/ColorPicker.vue'
import { CreditCard, CardFace } from './components/types'

export default defineComponent({
  components: { CardForm, CardPreview, CardBrand, ColorPicker },
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
    const backgroundColor = ref()
    const textColor = ref()

    const handleFormUpdate = (formCard: CreditCard) => {
      Object.assign(card, formCard)
    }

    const handleCardFlip = (side: CardFace) => {
      cardFace.value = side
    }

    const handleColorChange = ({ value, target }: Record<string, string>) => {
      if (target === 'background') {
        backgroundColor.value = value
      }

      if (target === 'text') {
        textColor.value = value
      }
    }

    return {
      handleFormUpdate,
      card,
      handleCardFlip,
      cardFace,
      handleColorChange,
      backgroundColor,
      textColor
    }
  }
})
</script>

<style></style>
