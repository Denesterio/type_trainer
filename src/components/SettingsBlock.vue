<template>
  <section class="shadow-box row text-center p-2 my-3">
    <div v-for="item in parseInt(itemsQuantity, 10)" :key="item" class="col">
      <slot :name="`item-${item}`"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    itemsQuantity: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.shadow-box {
   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>