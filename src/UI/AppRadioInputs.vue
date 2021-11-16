<template>
  <div>
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
        @change="changeLength(e)"
      >
      <label :for="`name-${i}`">{{ point.label }}</label>
    </div>
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
    'update:modelValue': (value) => {console.dir(value); return this.$props.points.map(p => p.value).includes(value)},
  },

  methods: {
    changeLength(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>