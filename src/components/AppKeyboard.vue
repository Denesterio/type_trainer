<template>
  <div ref="keyboard" class="keyboard" :class="{ 'opacity-50': status === 'loading' }">
    <div class="keyboard-row keyboard-row-1">
      <div data-code="126_96" class="keyboard-button"><small>~</small><br>`</div>
      <div data-code="49_33" class="keyboard-button bg-success"><small>!</small><br>1</div>
      <div data-code="50_64" class="keyboard-button bg-success"><small>@</small><br>2</div>
      <div data-code="51_35" class="keyboard-button bg-info"><small>#</small><br>3</div>
      <div data-code="52_36" class="keyboard-button bg-warning"><small>$</small><br>4</div>
      <div data-code="53_37" class="keyboard-button bg-primary"><small>%</small><br>5</div>
      <div data-code="54_64" class="keyboard-button bg-primary"><small>^</small><br>6</div>
      <div data-code="55_38" class="keyboard-button bg-danger"><small>&</small><br>7</div>
      <div data-code="56_42" class="keyboard-button bg-warning"><small>*</small><br>8</div>
      <div data-code="57_40" class="keyboard-button bg-info"><small>(</small><br>9</div>
      <div data-code="48_41" class="keyboard-button bg-success"><small>)</small><br>0</div>
      <div data-code="45_95" class="keyboard-button bg-success"><small>_</small><br>-</div>
      <div data-code="61_43" class="keyboard-button bg-success"><small>+</small><br>=</div>
      <div data-code="92_124" class="keyboard-button bg-success"><small>|</small><br>\</div>
      <div class="keyboard-button">Back</div>
    </div>
    <div class="keyboard-row keyboard-row-2">
      <div class="keyboard-button">Tab</div>
      <div data-code="113_81" class="keyboard-button bg-success">Q</div>
      <div data-code="119_87" class="keyboard-button bg-info">W</div>
      <div data-code="101_69" class="keyboard-button bg-warning">E</div>
      <div data-code="114_82" class="keyboard-button bg-primary">R</div>
      <div data-code="116_84" class="keyboard-button bg-primary">T</div>
      <div data-code="121_89" class="keyboard-button bg-danger">Y</div>
      <div data-code="117_85" class="keyboard-button bg-danger">U</div>
      <div data-code="105_73" class="keyboard-button bg-warning">I</div>
      <div data-code="111_79" class="keyboard-button bg-info">O</div>
      <div data-code="112_80" class="keyboard-button bg-success">P</div>
      <div data-code="91_123" class="keyboard-button bg-success"><small>{</small><br>[</div>
      <div data-code="93_125" class="keyboard-button bg-success"><small>}</small><br>]</div>
      <div class="keyboard-button"></div>
    </div>
    <div class="keyboard-row keyboard-row-3">
      <div class="keyboard-button">Caps</div>
      <div data-code="97_65" class="keyboard-button bg-success">A</div>
      <div data-code="115_83" class="keyboard-button bg-info">S</div>
      <div data-code="100_68" class="keyboard-button bg-warning">D</div>
      <div data-code="102_70" class="keyboard-button bg-primary">F</div>
      <div data-code="103_71" class="keyboard-button bg-primary">G</div>
      <div data-code="104_72" class="keyboard-button bg-danger">H</div>
      <div data-code="106_74" class="keyboard-button bg-danger">J</div>
      <div data-code="107_75" class="keyboard-button bg-warning">K</div>
      <div data-code="108_76" class="keyboard-button bg-info">L</div>
      <div data-code="59_58" class="keyboard-button bg-success"><small>:</small><br>;</div>
      <div data-code="39_34" class="keyboard-button bg-success"><small>"</small><br>'</div>
      <div class="keyboard-button">Enter</div>
    </div>
    <div class="keyboard-row keyboard-row-4">
      <div ref="leftShift" class="keyboard-button">Shift</div>
      <div data-code="122_90" class="keyboard-button bg-success">Z</div>
      <div data-code="120_88" class="keyboard-button bg-info">X</div>
      <div data-code="99_67" class="keyboard-button bg-warning">C</div>
      <div data-code="118_86" class="keyboard-button bg-primary">V</div>
      <div data-code="98_66" class="keyboard-button bg-primary">B</div>
      <div data-code="110_78" class="keyboard-button bg-danger">N</div>
      <div data-code="109_77" class="keyboard-button bg-danger">M</div>
      <div data-code="44_60" class="keyboard-button bg-warning">,</div>
      <div data-code="46_62" class="keyboard-button bg-info">.</div>
      <div data-code="47_63" class="keyboard-button bg-success"><small>?</small><br>/</div>
      <div ref="rightShift" class="keyboard-button">Shift</div>
    </div>
    <div class="keyboard-row keyboard-row-5">
      <div class="keyboard-button">Ctrl</div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button">Alt</div>
      <div data-code="32" class="keyboard-button">Space</div>
      <div class="keyboard-button">Alt</div>
      <div class="keyboard-button d-flex align-items-center justify-content-center"><windows-icon /></div>
      <div class="keyboard-button d-flex align-items-center justify-content-center"><context-menu-icon /></div>
      <div class="keyboard-button">Ctrl</div>
    </div>
  </div>
</template>

<script>
import WindowsIcon from '../icons/WindowsIcon.vue';
import ContextMenuIcon from '../icons/ContextMenuIcon.vue';
export default {
  components: {WindowsIcon, ContextMenuIcon},
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

  buttons: {},
  // all buttons added to object with keys as their codes in ASCII
  // [charCode]: [element, element(shiftButton)?]
  mounted() {
    for (let row of this.$refs.keyboard.children) {
      for (let button of row.children) {
        if (button.hasAttribute('data-code')) {
          const codes = button.getAttribute('data-code').split('_');
          this.$options.buttons[codes[0]] = [button];
          if (codes[1]) {
            this.$options.buttons[codes[1]] = [button, this.$refs.rightShift];
          }
        }
      }
    }
  },

  methods: {
    addWhiteText(index) {
      // class with white text add and remove by charCode of current symbol
      const code = this.splittedText[index].charCodeAt();
      this.$options.buttons[code].forEach((button) => button.classList.add('text-white'));
    },

    removeWhiteText(index) {
      const code = this.splittedText[index].charCodeAt();
      this.$options.buttons[code].forEach((button) => button.classList.remove('text-white'));
    }
  },

  watch: {
    currentIndex(newValue, oldValue) {
      if (this.status === 'started') {
        this.removeWhiteText(oldValue);
        this.addWhiteText(newValue);
      }
    },

    status(newValue) {
      if (newValue === 'started') {
        this.addWhiteText(0);
      }
    },
  }
}
</script>

<style scoped>
.keyboard {
  width: 710px;
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
.keyboard-row-1 {
  grid-template-columns: repeat(14, 45px) auto;
}
.keyboard-row-2 {
  grid-template-columns: 60px repeat(12, 45px) auto;
}
.keyboard-row-3 {
  grid-template-columns: 75px repeat(11, 45px) auto;
}
.keyboard-row-4 {
  grid-template-columns: 90px repeat(10, 45px) auto;
}
.keyboard-row-5 {
  grid-template-columns: repeat(3, 45px) 1fr repeat(4, 45px);
}
.keyboard-button {
  height: 45px;
  background-color: #dee2e6;
  padding: 2px 4px;
  line-height: 1.4;
  font-weight: bold;
}
</style>