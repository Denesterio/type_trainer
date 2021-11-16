<template>
  <div class="container bg-light shadow rounded h-100 p-4">
    <!-- change text length -->
    <app-radio-inputs
      v-model="currentTextLength"
      :points="textLengthSettings"
      name="text-size"
      class="text-center p-2 d-flex justify-content-center flex-direction-row"
    >
      выбрать длину текста:
    </app-radio-inputs>
    <!-- text container -->
    <div class="text-box bg-dark text-light rounded">
      <div v-if="currentText.length > 0" class="p-3">{{ currentText }}</div>
    </div>
    <p>{{ tLength }}</p>
  </div>
</template>

<script>
import AppRadioInputs from "./UI/AppRadioInputs.vue";
import api from './services/api.js';
export default {
  name: 'App',
  components: {AppRadioInputs},
  data() {
    return {
      textLengthSettings: [
        { value: '3', label: 'короткий' },
        { value: '6', label: 'средний' },
        { value: '9', label: 'большой' },
      ],
      currentTextLength: '6',
      currentText: '',
    }
  },

  computed: {
    tLength() {
      return this.currentText.length;
    }
  },

  created() {
    this.fetchText();
  },

  methods: {
    fetchText() {
      const params = {
        type: 'hipster-centric',
        sentences: parseInt(this.currentTextLength, 10),
      };
      api.get('text', params).then((data) => {
        this.currentText = data[0];
        console.dir(data[0]);
      })
    },
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