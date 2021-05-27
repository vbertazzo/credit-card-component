<template>
  <div class="flex flex-col">
    <label for="backgroundColor">Cor de fundo:</label>
    <input
      class="mt-1"
      type="color"
      :value="backgroundColor"
      id="backgroundColor"
      @input="handleColorChange($event, 'background')"
    />
  </div>
  <div class="flex flex-col mt-4">
    <label for="textColor">Cor da fonte:</label>
    <input
      class="mt-1"
      type="color"
      :value="textColor"
      id="textColor"
      @input="handleColorChange($event, 'text')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change-color'],
  props: {
    backgroundColor: {
      type: String,
      default: '#830AD1'
    },
    textColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  setup (props, ctx) {
    const handleColorChange = (
      event: { target: HTMLInputElement },
      target: 'background' | 'text'
    ) => {
      ctx.emit('change-color', { value: event.target.value, target })
    }

    return {
      handleColorChange
    }
  }
})
</script>
