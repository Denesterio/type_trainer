<template>
  <div class="container bg-light shadow rounded h-100 p-4">
    <!-- change text length -->
    <section class="shadow-box mb-3 p-2 text-center p-2 d-flex justify-content-center flex-direction-row">
      <app-radio-inputs
        v-model="currentTextLength"
        :points="textLengthSettings"
        name="text-size"
      >
        {{ $t('textLengthChange') }}:
      </app-radio-inputs>
    </section>
    <!-- text container -->
    <text-box
      v-model:current-char-index="currentCharIndex"
      v-model:status="status"
      :error="error"
      :current-text="splittedText"
      @refresh-text="fetchText"
    />
    <!-- keyboard -->
    <section class="mt-4">
      <!-- show keyboard checkboxes -->
      <div class="d-flex justify-content-evenly m-2 p-2">
        <app-switch-input
          id="keyboard-visibility"
          v-model="showKeyboard"
        >
          {{ $t('showKeyboard') }}
        </app-switch-input>
        <app-switch-input
          id="prompt-visibility"
          v-model="showKeyboardPrompt"
          :disabled="!showKeyboard || status === 'started'"
        >
          {{ $t('showPrompts') }}
        </app-switch-input>
      </div>
      <!-- keyboard component -->
      <app-keyboard
        v-if="showKeyboard"
        :splitted-text="splittedText"
        :current-index="currentCharIndex"
        :status="status"
        :show-keyboard-prompt="showKeyboardPrompt"
      />
    </section>
  </div>
</template>

<script>
import AppRadioInputs from "./UI/AppRadioInputs.vue";
import TextBox from './components/TextBox.vue';
import AppKeyboard from './components/AppKeyboard.vue';
import AppSwitchInput from './UI/AppSwitchInput.vue';
import api from './services/api.js';
export default {
  name: 'App',
  components: {AppRadioInputs, TextBox, AppKeyboard, AppSwitchInput},
  /***
  * @return
  * {
  *   status: 'loading'|'failed'|'waiting'|'started'|'finished',
  *   textLengthSettings: text length radios settings [{ text: string, value: string }],
  *   currentTextLength: string - choosen length,
  *   splittedText: array of strings - text for typing, splitted to array,
  *   currentCharIndex: number - index of active char in array
  *   showKeyboard: boolean,
  *   showKeyboardPrompt: boolean - mark an active char on the keyboard
  * }
  */
  data() {
    return {
      status: 'loading',
      textLengthSettings: [
        { value: '3', label: 'короткий' },
        { value: '6', label: 'средний' },
        { value: '9', label: 'большой' },
      ],
      currentTextLength: '6',
      splittedText: [],
      currentCharIndex: 0,
      showKeyboard: true,
      showKeyboardPrompt: true,
      error: '',
    }
  },

  created() {
    this.fetchText();
  },

  methods: {
    fetchText() {
      this.status = 'loading';
      const params = {
        type: 'meat-and-filler',
        sentences: parseInt(this.currentTextLength, 10),
      };
      api
        .get('text', params)
        .then((data) => {
          this.splittedText = data[0].split('');
          this.status = 'waiting';
        })
        .catch((err) => {
          this.status = 'failed';
          this.error = this.$t(err.message);
        });
    },
  },

  watch: {
    currentTextLength() {
      this.fetchText();
    },
  },
}
</script>

<style>
.shadow-box {
   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
