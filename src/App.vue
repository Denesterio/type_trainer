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
    <text-box :currentText="splittedText" @refresh-text="fetchText" />
  </div>
</template>

<script>
import AppRadioInputs from "./UI/AppRadioInputs.vue";
import TextBox from './components/TextBox.vue';
import api from './services/api.js';
export default {
  name: 'App',
  components: {AppRadioInputs, TextBox},
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
    splittedText() {
      return this.currentText.split('');
    },
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
      })
    },
  }
}
</script>
