<template>
  <div class="steps">
    <h1 class="title">
      <a
        href="https://www.npmjs.com/package/vue-message-plugin-ts"
        target="_blank"
      >vue-message-plugin-ts</a>
    </h1>
    <div class="steps-line" />
    <p class="steps-comment">
      A message plugin base on Vue with Typescript support.
      <b class="warning">Supports only Vue (3.x) version</b>
    </p>
    <h3 class="steps-title">
      Installation
    </h3>
    <div class="steps-line" />
    <p class="steps-comment">
      You can install the package yarn:
    </p>
    <CodeReader :code-lang="'bash'">
      {{ InstallationCode.yarn }}
    </CodeReader>
    <p class="steps-comment">
      Or npm:
    </p>
    <CodeReader :code-lang="'bash'">
      {{ InstallationCode.npm }}
    </CodeReader>
    <h3 class="steps-title">
      Register Plugin
    </h3>
    <div class="steps-line" />
    <CodeReader :code-lang="'js'">
      {{ RegistrationCode.script }}
    </CodeReader>
    <CodeReader :code-lang="'vue'">
      {{ RegistrationCode.template }}
    </CodeReader>
    <h3 class="steps-title">
      Usage
    </h3>
    <div class="steps-line" />
    <CodeReader :code-lang="'js'">
      {{ UsageCode.script }}
    </CodeReader>
    <h3 class="steps-title">
      Usage advanced
    </h3>
    <CodeReader :code-lang="'js'">
      {{ UsageAdvanced.script }}
    </CodeReader>
    <CodeReader :code-lang="'vue'">
      {{ UsageAdvanced.template }}
    </CodeReader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepsUsageComponent',
})
</script>

<script lang="ts" setup>
import CodeReader from '@/components/code-reader.vue'
// Codes
import InstallationCode from '@/data/installation-code'
import RegistrationCode from '@/data/register-code'
import UsageCode from '@/data/usage-code'
import UsageAdvanced from '@/data/usage-advanced-code'
</script>
