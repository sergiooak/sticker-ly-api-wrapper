<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <p>
        <span>Developed with&nbsp;</span>
        <span>
          <UIcon
            title="love"
            name="i-fluent-emoji-blue-heart"
            class="inline-block size-6 align-middle -translate-y-0.5"
          />
        </span>
        <span class="sr-only">
          love
        </span>
        <span>&nbsp;by&nbsp;</span>
        <span>
          <NuxtLink
            class="text-primary font-bold underline"
            to="https://github.com/sergiooak"
          >sergiooak</NuxtLink>
        </span>
      </p>
    </template>
  </UFooter>
</template>
