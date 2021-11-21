<template>
  <section class="container">
    <!-- box with text -->
    <div class="text-box mb-3">
      <!-- input for catch typing -->
      <input
        v-model="currentInput"
        type="text"
        ref="hiddenInput"
        class="hiddenInput"
        @blur="focusOnInput"
        @input="handleNextChar"
      >
      <!-- text and conditional covers -->
      <!-- waiting cover -->
      <div v-if="status === 'waiting' || isLoading" class="text-box-cover">
        <button
          @click="startTyping"
          class="btn btn-primary btn-lg"
        >
          <app-spinner v-if="isLoading" color="light" />
          <span v-else v-t="'start'"></span>
        </button>
      </div>
      <!-- results cover -->
      <div v-else-if="status === 'finished'" class="text-box-cover bg-light">
        <div class="text-center p-3">
          {{ $t('testFinished') }}:
          <br>
          {{ $t('speed') }}: {{ typingSpeed.speed }}
          <br>
          {{ $t('accuracy') }}: {{ accuracy }}%
          <br>
          <button
            @click="refreshText"
            class="btn btn-outline-primary"
            v-t="'startNew'"
          ></button>
        </div>
      </div>
      <!-- error cover -->
      <div v-else-if="status === 'failed'" class="text-box-cover bg-light flex-column">
        <div class="text-danger text-center">{{ error }}</div>
        <button
          @click="refreshText"
          class="btn btn-outline-primary mt-2"
          v-t="'refresh'"
        ></button>
      </div>
      <!-- text -->
      <div v-if="currentText.length > 0" class="p-3" ref="textBox">
        <span
          v-for="(char, i) in currentText"
          :key="i"
          :class="{ 'active-char': isCharCurrent(i), 'text-success': isCharRight(i), 'text-danger': isCharWrong(i), 'bg-danger': isCharWrong(i) && char === ' ' }"
        >
          {{ char }}
        </span>
      </div>
    </div>
    <!-- typing info -->
    <div class="row text-center text-primary shadow-box p-2">
      <div class="col">{{currentCharIndex}}/{{ textLength }}</div>
      <div class="col">{{ $t('speed') }}: {{ typingSpeed.speed }} <small v-t="'speedMeasuring'"></small></div>
      <div class="col">{{ $t('accuracy') }}: {{ accuracy }}%</div>
      <div class="col">
        <button
          @click="refreshText"
          class="btn btn-outline-primary"
        >
          <app-spinner v-if="isLoading" color="primary" />
          <span v-else v-t="'refresh'"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import AppSpinner from './AppSpinner.vue';
export default {
  props: {
    currentText: {
      type: Array,
      required: true,
    },
    currentCharIndex: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {AppSpinner},

  /***
  * @return
  * {
  *   lastCharStatus: 'right' | 'wrong', - is last typed char right,
  *   currentInput: hidden input for check user's typing,
  *   typingErrors: count of errors for accuracy,
  *   typingSpeed: timer, seconds passed, calculated speed
  * }
  */
  data() {
    return {
      lastCharStatus: 'right',
      currentInput: '',
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

    lastIndex() {
      return this.currentText.length - 1;
    },

    accuracy() {
      if (this.isLoading || this.status === 'failed') return 0;
      return (100 - this.typingErrors / this.textLength * 100).toFixed(2);
    },

    isLoading() {
      return this.status === 'loading';
    },
  },

  methods: {
    calculateTypingSpeed() {
      this.typingSpeed.seconds += 1;
      const speed = Math.round(this.currentCharIndex * 60 / this.typingSpeed.seconds);
      if (speed === 0 && this.currentCharIndex > 0) {
        this.typingSpeed.speed  = '< 1';
      } else {
        this.typingSpeed.speed = speed;
      }
    },

    startTyping() {
      this.$emit('update:status', 'started');
      this.$refs.hiddenInput.focus();
    },

    handleNextChar(e) {
      if (!this.typingSpeed.timer) {
        this.typingSpeed.timer = setInterval(this.calculateTypingSpeed, 1000);
      }
      // if symbol is correct
      if (this.currentText[this.currentCharIndex] === e.data) {
        this.lastCharStatus = 'right';
        // if it's the last symbol, stop, else +1
        if (this.currentCharIndex === this.lastIndex) {
          this.stopTyping();
        }
        this.$emit('update:currentCharIndex', this.currentCharIndex + 1);
      } else if (this.lastCharStatus === 'right') {
        this.lastCharStatus = 'wrong';
        this.typingErrors += 1;
      }
    },

    stopTyping() {
      clearInterval(this.typingSpeed.timer);
      this.typingSpeed.timer = null;
      this.$emit('update:status', 'finished');
    },

    focusOnInput(e) {
      if (this.status === 'started') {
        e.preventDefault();
        this.$refs.hiddenInput.focus();
      }
    },

    refreshText() {
      this.currentInput = '';
      this.$emit('update:currentCharIndex', 0);
      this.lastCharStatus = 'right';
      this.typingErrors = 0;
      this.typingSpeed = {
        timer: null,
        seconds: 0,
        speed: 0,
      };
      this.$emit('refresh-text');
    },

    isCharCurrent(i) {
      return this.status === 'started' && this.currentCharIndex === i;
    },

    isCharRight(i) {
      return this.status === 'started' && i < this.currentCharIndex;
    },

    isCharWrong(i) {
      return this.status === 'started' && this.lastCharStatus === 'wrong' && this.currentCharIndex === i;
    },
  },
}
</script>

<style scoped>
.text-box {
  font-size: 1.2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  min-height: 200px;
  line-height: 1.4;
  padding: 1rem;
  position: relative;
  white-space: break-spaces;
  letter-spacing: 1px;
  box-shadow: inset 3px 3px 7px rgba(147, 147, 140, 0.3), 2px 2px 5px rgba(255, 255, 255, 1);
}
.text-box-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(13, 110, 253, 0.1);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  position: absolute;
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
.active-char{
  background-color: rgba(0, 0, 0, 0.2);
}
</style>