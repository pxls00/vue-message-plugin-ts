<template>
  <div :class="['code-area', `code-area--${props.codeName}`]">
    <span class="code-area-language">{{ props.codeLang }}</span>
    <pre><code><slot /></code></pre>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CodeReaderComponent'
})
</script>

<script lang="ts" setup>
interface IProps {
  codeLang?: string,
  codeName: string
}

const props = defineProps<IProps>()
</script>