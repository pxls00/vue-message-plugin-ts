<template>
  <v-message />
</template>

<script setup lang="ts"></script>

<style lang="scss">
body {
  background: $purple-80;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans';
}

.message__list {
  max-width: 370px;
  width: 100%;
  margin-left: auto;
  margin-top: 10px;
  margin-right: 10px;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
