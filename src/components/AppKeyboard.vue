<template>
  <div class="keyboard">
    <div class="keyboard-row keyboard-row-1">
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
    </div>
    <div class="keyboard-row keyboard-row-2">
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
    </div>
    <div class="keyboard-row keyboard-row-3">
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
    </div>
    <div class="keyboard-row keyboard-row-4">
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
    </div>
    <div class="keyboard-row keyboard-row-5">
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
      <div class="keyboard-button"></div>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  width: 710px;
  display: grid;
  grid-template-rows: repeat(5, 45px);
  gap: 2px;
  margin: 0 auto;
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
  background-color: grey;
}
</style>