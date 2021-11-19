<template>
  <div class="d-flex justify-content-center w-100 h-100">
    <div :class="`spinner-border spinner-border-sm text-${color}`" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  // color: 'dark'|'light'|'primary'|'secondary'|'success'
  props: {
    color: {
      type: String,
      required: false,
      default: "dark"
    }
  }
}
</script>