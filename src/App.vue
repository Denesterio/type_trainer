<template>
  <div class="container bg-light shadow rounded h-100 p-4">
    <!-- change text length -->
    <section class="shadow-box mb-3 p-2 text-center p-2 d-flex justify-content-center flex-direction-row">
      <app-radio-inputs
        v-model="currentTextLength"
        :points="textLengthSettings"
        name="text-size"
      >
        выбрать длину текста:
      </app-radio-inputs>
    </section>
    <!-- text container -->
    <text-box :currentText="splittedText" @refresh-text="fetchText" />
    <!-- keyboard -->
    <section class="mt-4">
      <app-keyboard></app-keyboard>
    </section>
  </div>
</template>

<script>
import AppRadioInputs from "./UI/AppRadioInputs.vue";
import TextBox from './components/TextBox.vue';
import AppKeyboard from './components/AppKeyboard.vue';
import api from './services/api.js';
export default {
  name: 'App',
  components: {AppRadioInputs, TextBox, AppKeyboard},
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

<style>
.shadow-box {
   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
