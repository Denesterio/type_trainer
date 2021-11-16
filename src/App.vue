<template>
  <div class="container bg-light shadow rounded h-100 p-4">
    <app-radio-inputs
      v-model="currentTextLength"
      class="text-center p-2 d-flex justify-content-center flex-direction-row"
      :points="textLengthSettings"
      name="text-size"
    >выбрать длину текста:</app-radio-inputs>
    <div class="text-box bg-dark text-light rounded">
      <div v-if="text.length > 0" class="p-3">{{ text }}</div>
    </div>
    <p>{{ tLength }}</p>
  </div>
</template>

<script>
import AppRadioInputs from "./UI/AppRadioInputs.vue";
export default {
  name: 'App',
  components: {AppRadioInputs},
  data() {
    return {
      text: '«Зеленые жнецы» (The Green Reapers) — работа французского видеохудожника Томаса Бланшара. Четыре месяца он, вооружившись камерой с разрешением 8K, снимал мир насекомых и поедающих их растений. Венерины мухоловки, росянки и непентесы (напоминающие кувшины ловушки) запечатлены за убийством и поглощением животных. И выглядит это завораживающе. Автор начал с саспенса и закончил слэшером — настоящий сплаттерпанк.',
      textLengthSettings: [
        { value: '5', label: 'короткий' },
        { value: '10', label: 'средний' },
        { value: '15', label: 'большой' },
      ],
      currentTextLength: '10',
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