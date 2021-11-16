<template>
  <div class="container bg-light shadow rounded h-100 p-4">
    <div class="text-center p-2">выбрать размер текста:<br />маленький | средний | большой</div>
    <div class="text-box bg-dark text-light rounded">
      <div v-if="text.length > 0" class="p-3">{{ text }}</div>
    </div>
    <p>{{ tLength }}</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      text: '«Зеленые жнецы» (The Green Reapers) — работа французского видеохудожника Томаса Бланшара. Четыре месяца он, вооружившись камерой с разрешением 8K, снимал мир насекомых и поедающих их растений. Венерины мухоловки, росянки и непентесы (напоминающие кувшины ловушки) запечатлены за убийством и поглощением животных. И выглядит это завораживающе. Автор начал с саспенса и закончил слэшером — настоящий сплаттерпанк.'
    }
  },

  computed: {
    tLength() {
      return this.text.length;
    }
  }
}
</script>

<style scoped>
.text-box {
  min-height: 200px;
  line-height: 1.5;
  padding: 1rem;
  font-size: 1.2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
</style>