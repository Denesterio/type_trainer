<template>
  <div class="keyboard" :class="{ 'opacity-50': status === 'loading' }">
    <div v-for="(row, i) in keyboardButtons" :key="i" :class="`keyboard-row keyboard-row-${i}`">
      <div
        v-for="button in row"
        :key="button.code"
        :data-code="button.code"
        :class="{
          'keyboard-button': true,
          [classes[button.color]]: true,
          'text-white': isButtonActive(button.content),
        }"
      >
        {{ button.content.join('\n') }}
      </div>
    </div>
  </div>
</template>

<script>
import keyboardButtons from '../keyboardButtons.js';
export default {
  props: {
    splittedText: {
      type: Array,
      required: true,
    },

    currentIndex: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      keyboardButtons: keyboardButtons,
      classes: {
        1: 'bg-success',
        2: 'bg-info',
        3: 'bg-warning',
        4: 'bg-primary',
        5: 'bg-danger',
      },
    };
  },

  computed: {
    symbolsInUpperCase() {
      return this.splittedText.map((s) => s.toUpperCase());
    },

    shiftSymbols() {
      const result = [];
      for (const row of this.keyboardButtons) {
        for (const button of row) {
          if (button.code.length > 0) {
            result.push(parseInt(button.code));
          }
        }
      }

      return result;
    },
  },

  methods: {
    isButtonActive(content) {
      if (content[0] === 'Space') return this.splittedText[this.currentIndex] === ' ';
      if (content[0] === 'Shift') return this.shiftSymbols.includes(this.splittedText[this.currentIndex]?.charCodeAt());
      return content.includes(this.symbolsInUpperCase[this.currentIndex]);
    }
  },
}
</script>

<style scoped>
.keyboard {
  width: 720px;
  display: grid;
  grid-template-rows: repeat(5, 45px);
  gap: 2px;
  margin: 0 auto;
  border: 5px solid #f8f9fa;
  box-shadow: 0 0 5px #333;
}
.keyboard-row {
  display: grid;
  gap: 2px;
}
.keyboard-row-0 {
  grid-template-columns: repeat(14, 45px) auto;
}
.keyboard-row-1 {
  grid-template-columns: 60px repeat(12, 45px) auto;
}
.keyboard-row-2 {
  grid-template-columns: 75px repeat(11, 45px) auto;
}
.keyboard-row-3 {
  grid-template-columns: 90px repeat(10, 45px) auto;
}
.keyboard-row-4 {
  grid-template-columns: repeat(3, 45px) 1fr repeat(4, 45px);
}
.keyboard-button {
  height: 45px;
  background-color: #dee2e6;
  padding: 3px 6px;
  line-height: 1.3;
  font-weight: bold;
  white-space: pre-wrap;
}
</style>