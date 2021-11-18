<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      :id="id"
      :disabled="disabled"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    >
    <label class="form-check-label" :for="id"><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    modelValue: {
      type: Boolean,
      required: true,
    }
  },

  emits: {
    'update:modelValue': (value) => typeof value === 'boolean',
  }
}
</script>