<template>
  <div class="code-area">
    <span class="code-area-language">{{ props.codeLang }}</span>
    <pre><code><slot /></code></pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeReaderComponent',
})
</script>

<script lang="ts" setup>
interface IProps {
  codeLang?: string
}

const props = defineProps<IProps>()
</script>
