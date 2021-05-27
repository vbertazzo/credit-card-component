<template>
  <div class="w-48">
    <input
      class="px-4 py-1 border rounded"
      :class="error ? 'border-red-600' : ''"
      :type="type"
      :id="name"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
    />
    <p class="mt-1 text-sm text-red-600" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:modelValue', 'focus'],
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String
    }
  },
  setup (props, ctx) {
    const handleInput = (event: any) => {
      ctx.emit('update:modelValue', event.target.value)
    }

    const handleFocus = () => {
      ctx.emit('focus')
    }

    return {
      handleInput,
      handleFocus
    }
  }
})
</script>
