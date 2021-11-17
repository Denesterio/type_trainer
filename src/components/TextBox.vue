<template>
  <div class="text-container">
    <!-- box with text -->
    <div class="text-box bg-dark text-light rounded mb-3">
      <!-- input for catch typing -->
      <input
        v-model="currentInput"
        type="text"
        ref="hiddenInput"
        class="hiddenInput"
        @blur="focusOnInput"
        @input="handleNextChar"
      >
      <!-- text -->
      <div v-if="status === 'waiting'" class="text-box-cover">
        <button @click="startTyping" class="btn btn-primary btn-lg">Начать</button>
      </div>
      <div v-if="currentText.length > 0" class="p-3" ref="textBox">
        <span
          v-for="(char, i) in currentText"
          :key="i"
          :class="{ 'bg-secondary': status === 'started' && countOfTypedChars === i, 'text-success': status === 'started' && i < countOfTypedChars, 'text-danger': status === 'started' && lastCharStatus === 'wrong' && countOfTypedChars === i }"
        >
          {{ char }}
        </span>
      </div>
    </div>
    <!-- typing info -->
    <div class="row text-center text-primary">
      <div class="col">{{countOfTypedChars}}/{{ textLength }}</div>
      <div class="col">Скорость: {{ typingSpeed.speed }} <small>зн/мин</small></div>
      <div class="col">Точность: {{ accuracy }}%</div>
      <div class="col">
        <button
          @click="refreshText"
          class="btn btn-outline-primary"
        >
          Обновить
        </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentText: {
      type: Array,
      required: true,
    }
  },

  /***
  * @return
  * {
  *   status: 'waiting' | 'started' | 'finished',
  *   lastCharStatus: 'right' | 'wrong', - is last typed char right
  * }
  */
  data() {
    return {
      status: 'waiting',
      lastCharStatus: 'right',
      currentInput: '',
      countOfTypedChars: 0,
      typingErrors: 0,
      typingSpeed: {
        timer: null,
        seconds: 0,
        speed: 0,
      }
    };
  },

  computed: {
    textLength() {
      return this.currentText.length;
    },

    activeCharIndex() {
      return this.countOfTypedChars;
    },

    accuracy() {
      return (100 - this.typingErrors / this.textLength * 100).toFixed(2);
    }
  },

  methods: {
    calculateTypingSpeed() {
      this.typingSpeed.seconds += 1;
      const speed = Math.round(this.countOfTypedChars * 60 / this.typingSpeed.seconds);
      if (speed === 0 && this.countOfTypedChars > 0) {
        this.typingSpeed.speed  = '< 1';
      } else {
        this.typingSpeed.speed = speed;
      }
    },

    startTyping() {
      this.status = 'started';
      this.$refs.hiddenInput.focus();
      this.typingSpeed.timer = setInterval(this.calculateTypingSpeed, 1000);
    },

    handleNextChar(e) {
      if (this.currentText[this.countOfTypedChars] === e.data) {
        this.lastCharStatus = 'right';
        this.countOfTypedChars++;
      } else if (this.lastCharStatus === 'right') {
        this.lastCharStatus = 'wrong';
        this.typingErrors++;
      }
    },

    focusOnInput(e) {
      e.preventDefault();
      if (this.status === 'started') {
        this.$refs.hiddenInput.focus();
      }
    },

    refreshText() {
      this.status = 'waiting';
      this.$emit('refresh-text');
    },
  },
}
</script>

<style scoped>
.text-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.2rem;
}
.text-box {
  min-height: 200px;
  line-height: 1.5;
  padding: 1rem;
  position: relative;
}
.text-box-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  position: absolute;
}
.text-box-cover button {
  opacity: 0.8;
}
.hiddenInput {
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.col {
    line-height: 38px;
}
</style>