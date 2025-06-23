<script lang="ts" setup>
const props = withDefaults(defineProps<{ title?: string, description?: string, headline?: string }>(), {
  title: 'title',
  description: 'description'
})

const title = computed(() => (props.title || '').slice(0, 60))
const description = computed(() => (props.description || '').slice(0, 200))
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-blue-600">
    <!-- <img
      class="absolute right-0 top-0 h-full"
      src="https://play-lh.googleusercontent.com/UA4BAOkIiWHv2gse7njSg3ApWz_2ke21X65qQh4oMg55Q0hTDuVMLPMMKW_56JMB_XM"
      alt=""
    > -->

    <div class="pl-[100px]">
      <p
        v-if="headline"
        class="uppercase text-[24px] text-blue-300 mb-4 font-semibold"
      >
        {{ headline }}
      </p>
      <h1
        v-if="title"
        class="m-0 text-[75px] font-semibold mb-4 text-white flex items-center"
      >
        <span>{{ title }}</span>
      </h1>
      <p
        v-if="description"
        class="text-[32px] text-[#E4E4E7] leading-tight w-[700px]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
