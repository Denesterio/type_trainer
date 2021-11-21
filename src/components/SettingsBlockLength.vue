<template>
  <settings-block items-quantity="1">
    <template v-slot:item-1>
      <div class="d-flex justify-content-center flex-direction-row">
        <app-radio-inputs
          @update:modelValue="changeLength"
          :modelValue="currentTextLength"
          :points="textLengthSettings"
          name="text-size"
        >
          {{ $t('textLengthChange') }}:
        </app-radio-inputs>
      </div>
    </template>
  </settings-block>
</template>

<script>
import SettingsBlock from './SettingsBlock.vue';
import AppRadioInputs from "./AppRadioInputs.vue";
export default {
  components: {SettingsBlock, AppRadioInputs},
  props: {
    currentTextLength: {
      type: String,
      required: true,
    },
  },

  emits: {
    'update:currentTextLength': (value) => typeof value === 'string',
  },

  data() {
    return {
      textLengthSettings: [
        { value: '3', label: this.$t('short') },
        { value: '6', label: this.$t('middle') },
        { value: '9', label: this.$t('long') },
      ],
    }
  },

  methods: {
    changeLength(v) {
      this.$emit('update:currentTextLength', v);
    },
  }
}
</script>