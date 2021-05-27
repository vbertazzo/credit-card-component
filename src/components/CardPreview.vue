<template>
  <div class="scene w-60 h-96">
    <div
      class="card w-full h-full relative border shadow rounded-xl transition-transform duration-1000"
      :class="{ 'is-flipped': !(face === 'front') }"
      :style="{ 'border-color': textColor }"
      data-test="card"
    >
      <div
        class="front card__face absolute h-full w-full p-6 rounded-xl "
        :style="bgColor"
      >
        <div class="flex items-start">
          <CardBrand :brand="brand" :type="type" :color="textColor" />

          <svg
            viewBox="0 0 32 39"
            fill="none"
            class="w-8 ml-10 mt-5"
            :style="svgColor"
            data-test="chip"
          >
            <path
              d="M31 19.5L31 34C31 36.2091 29.2091 38 27 38L22.375 38M31 19.5L31 5C31 2.79086 29.2091 1 27 1L22.375 1M31 19.5L22.375 13.0816M31 19.5L22.375 25.1633M22.375 13.0816C16.2243 13.8405 15.2757 13.9027 9.125 13.0816M22.375 13.0816L22.375 1M9.125 13.0816L0.999999 19.5M9.125 13.0816L9.125 7.04082L9.125 0.999999M0.999999 19.5L1 5C1 2.79086 2.79086 0.999999 5 0.999999L9.125 0.999999M0.999999 19.5L0.999999 34C0.999998 36.2091 2.79086 38 5 38L9.125 38M0.999999 19.5L9.125 25.1633M22.375 25.1633C16.2244 23.9982 15.2756 24.0805 9.125 25.1633M22.375 25.1633L22.375 38M9.125 25.1633L9.125 31.5816L9.125 38M22.375 38L9.125 38M22.375 1L9.125 0.999999"
            />
          </svg>
        </div>
        <div>
          <p
            class="mt-40 text-xl font-semibold"
            :style="txtColor"
            data-test="name"
          >
            {{ name }}
          </p>
        </div>
      </div>
      <div
        class="back card__face absolute h-full w-full p-6 rounded-xl"
        :style="bgColor"
      >
        <div class="flex items-start">
          <svg
            viewBox="0 0 32 39"
            fill="none"
            class="w-8 ml-12 mt-5"
            :style="svgColor"
            data-test="chip"
          >
            <path
              d="M31 19.5L31 34C31 36.2091 29.2091 38 27 38L22.375 38M31 19.5L31 5C31 2.79086 29.2091 1 27 1L22.375 1M31 19.5L22.375 13.0816M31 19.5L22.375 25.1633M22.375 13.0816C16.2243 13.8405 15.2757 13.9027 9.125 13.0816M22.375 13.0816L22.375 1M9.125 13.0816L0.999999 19.5M9.125 13.0816L9.125 7.04082L9.125 0.999999M0.999999 19.5L1 5C1 2.79086 2.79086 0.999999 5 0.999999L9.125 0.999999M0.999999 19.5L0.999999 34C0.999998 36.2091 2.79086 38 5 38L9.125 38M0.999999 19.5L9.125 25.1633M22.375 25.1633C16.2244 23.9982 15.2756 24.0805 9.125 25.1633M22.375 25.1633L22.375 38M9.125 25.1633L9.125 31.5816L9.125 38M22.375 38L9.125 38M22.375 1L9.125 0.999999"
            />
          </svg>
        </div>
        <div class="mt-40 space-y-3 text-lg">
          <p :style="txtColor" data-test="number">
            {{ formattedNumber }}
          </p>
          <p :style="txtColor" data-test="expiration-date">
            {{ formattedDate }}
          </p>
          <p :style="txtColor" data-test="verification-code">
            {{ verificationCode }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import CardBrand from './CardBrand.vue'

export default defineComponent({
  name: 'CardPreview',
  components: { CardBrand },
  props: {
    number: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    expirationDate: {
      type: String,
      required: true
    },
    verificationCode: {
      type: String,
      required: true
    },
    face: {
      type: String,
      default: 'front'
    },
    backgroundColor: {
      type: String,
      default: '#830AD1'
    },
    textColor: {
      type: String,
      default: '#FFF'
    },
    type: {
      type: String as () => 'outline' | 'fill',
      default: 'fill'
    }
  },
  setup (props) {
    const bgColor = computed(() => {
      return props.type === 'fill'
        ? `background-color: ${props.backgroundColor}`
        : 'background-color: white'
    })

    const txtColor = computed(() => {
      return `color: ${props.textColor}`
    })

    const svgColor = computed(() => {
      return `stroke: ${props.textColor}`
    })

    const formattedNumber = computed(() => {
      return props.number
        .replace(/\W/gi, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    })

    const formattedDate = computed(() => {
      return props.expirationDate.replace('/', ' / ')
    })

    return {
      bgColor,
      txtColor,
      svgColor,
      formattedNumber,
      formattedDate
    }
  }
})
</script>

<style scoped>
.scene {
  perspective: 600px;
}

.card {
  transform-style: preserve-3d;
}

.card__face {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

.is-flipped {
  transform: rotateY(180deg);
}
</style>
