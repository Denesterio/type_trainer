<template>
  <settings-block items-quantity="4">
    <template v-slot:item-1>
      <div class="col">
        {{currentCharIndex}}/{{ textLength }}
      </div>
    </template>
    <template v-slot:item-2>
      <div class="col">
        {{ $t('speed') }}: {{ typingSpeed.speed }} <small v-t="'speedMeasuring'"></small>
      </div>
    </template>
  </settings-block>
</template>

<script>
import SettingsBlock from './SettingsBlock.vue';
export default {
  components: {SettingsBlock},
  props: {
    currentCharIndex: {
      type: Number,
      required: true,
    },

    textLength: {
      type: Number,
      required: true,
    },
  }
}
</script>