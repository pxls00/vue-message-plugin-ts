<template>
  <v-message>
    <template #message__title-custom="{ item: { item } }">
      <div class="account">
        <h3 class="account-title">
          {{ item.title.value.title }}
        </h3>
        <p class="account-body">
          {{ item.title.value.body }}
        </p>
      </div>
    </template>
  </v-message>
  <StepsUsage />
  <DemoComponent />
  <FooterComponent />
</template>

<script setup lang="ts">
import DemoComponent from '@/components/demo.vue'
import StepsUsage from '@/components/steps-usage.vue'
import FooterComponent from '@/components/footer.vue'
</script>

<style scoped></style>
