<template>
  <div class="mx-3">
    <b><slot></slot></b>
  </div>
  <div v-for="(point, i) in points" :key="point.value">
    <input
      class="m-1"
      type="radio"
      :id="`name-${i}`"
      :name="name"
      :value="point.value"
      :checked="modelValue === point.value"
      @change="changeLength"
    >
    <label :for="`name-${i}`">{{ point.label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    // [{
    //   value: string,
    //   label: string
    // }]
    points: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
    }
  },

  emits: {
    'update:modelValue': (value) => typeof value === 'string',
  },

  methods: {
    changeLength(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style scoped>

</style>