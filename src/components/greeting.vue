<template>
  <div>
    {{ greeting }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GreeetingPage',

  data () {
    return {
      greeting: 'Vue and TDD',
    }
  },
})
</script>