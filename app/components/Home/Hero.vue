<script lang="ts" setup>
const stickers = [
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/PU8agdm1mtHI8vyY7U0vnA/XTBRXV/22/34b98620-1606-457f-8549-64f3b67d885e.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/ZLxMBDodBKKYC8TeSfdpA/SCGPXX/16/1748115225311.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/KmuC7L4ENfGnOesHVXJrw/CDTIPC/18/39634158.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/1SF5VS/16/561375fb-b5e8-4709-8caa-86d89b48e732.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/MGU8sA927ahRF7KMT9dluA/XGPG7O/33/-304901105.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/8152F4/16/208fffad-7601-4118-ba18-77a3ee2bc485.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/Oum9kPS8KGelttGvNNB8Q/CYRPVU/29/428424364.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/P1dLRQzYJzN3Qrfe6Ms8mQ/M1KOKG/31/1896852836.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/ST1u2ucINsVC3qQEEWDfcg/BHDSCA/11/1744162764246.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/SPLY9X/16/e994d14a-6fcc-4bcb-82d1-d2bc8f2be5fa.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/FYhsSeGVUAi8V15l0L1mog/2MGO8A/15/1200969541.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/exrF8RoaxLoqrBkSZrYQ/P5ALBB/16/2edd4bfa-11fe-4c22-82e3-7dfd2c6e3721.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/p2aUwTa0jVxZPrDOdgdug/WF4A6C/20/-1995009354.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/otzizSALsXVmSDTXnKXQ/MY8JDS/27/1769703040.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/e5FKR5sL7deRECyx2Lalaw/1L9OMI/26/1749126019676.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/fEgoMGSOkL3nv1PStQ9h6g/JWKQIT/16/-714522662.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/MGU8sA927ahRF7KMT9dluA/XGPG7O/33/-1473352973.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/IRqcyKH8UIrPBKdhmbOGA/X0UXOR/14/453020188.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/exrF8RoaxLoqrBkSZrYQ/P5ALBB/16/43efe181-cc3b-4c08-aff1-47fd42a34dc0.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qEHWbbeYQOnF1xvik5Fsg/PQRFQC/29/-1314492216.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/DW2vgRKcqQczGDCJuGBkTQ/TXU021/16/2094954969.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/DW2vgRKcqQczGDCJuGBkTQ/TXU021/16/2070043834.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/SPLY9X/16/6e1f412e-3457-4159-b6b3-3f2a862eabb0.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/1SF5VS/16/a104ae91-63ea-4eba-823b-6cb175c5eca2.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/DW2vgRKcqQczGDCJuGBkTQ/5VKSTI/16/-1605701370.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/P1dLRQzYJzN3Qrfe6Ms8mQ/M1KOKG/31/1921640868.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/t7uXt4g0IrX1eevTe0Hc5w/0HZM7C/31/1164652605.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/qXE3lVwsjZg7FFwvUQkRg/1SF5VS/16/3c26f1c3-2599-44d7-8fd5-7f3628a5cf63.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/PU8agdm1mtHI8vyY7U0vnA/XTBRXV/22/a0ce4c28-b3a6-4671-a0b4-39f399788657.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/2EwjbXYFFoUIJnQ37LeA/E6HUZU/12/-1596325396.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/IRqcyKH8UIrPBKdhmbOGA/X0UXOR/14/453946561.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/PU8agdm1mtHI8vyY7U0vnA/XTBRXV/22/e55b7813-24fc-4ee4-b55c-1f7d6b0f2190.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/FYhsSeGVUAi8V15l0L1mog/2MGO8A/15/232129950.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/GPyTbSabzVZpcOKmzEIA/AOU23J/16/-137690516.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/FYhsSeGVUAi8V15l0L1mog/2MGO8A/15/1056118044.webp',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/2EwjbXYFFoUIJnQ37LeA/E6HUZU/12/-1594479415.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/t7uXt4g0IrX1eevTe0Hc5w/TDD19L/33/-1343911973.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/e5FKR5sL7deRECyx2Lalaw/1L9OMI/26/1749126020956.png',
  'https://sticker-ly-api.sergiooak.com.br/file/sticker_pack/DW2vgRKcqQczGDCJuGBkTQ/TXU021/16/2071980152.png'
]

// Randomly select 15 stickers from the array
const fifteenStickers = [...stickers]
  .sort(() => Math.random() - 0.5)
  .slice(0, 15)
</script>

<template>
  <section class="body-font overflow-hidden bg-primary-500 relative dark:bg-primary-500/15">
    <div class="container mx-auto flex gap-4 md:gap-8 py-12 xl:py-24 px-4 md:flex-row flex-col-reverse items-center">
      <div class="w-full md:w-1/2 transform [perspective:800px] origin-top md:translate-x-8">
        <div
          class="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 [transform-style:preserve-3d] transform rotate-x-[20deg] md:rotate-x-[0deg] md:rotate-y-[20deg] group"
        >
          <div
            v-for="(sticker, i) in fifteenStickers"
            :key="i"
            :class="[
              'overflow-hidden transition-all duration-300 md:hover:translate-x-1 hover:scale-125 origin-bottom md:origin-left peer hover:opacity-100 group-hover:opacity-75 hover:z-10',
              i >= 12 ? 'hidden xl:block' : ''
            ]"
          >
            <img
              class="object-cover object-center w-full h-full"
              alt="sticker example"
              :src="sticker"
            >
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 class="title-font sm:text-4xl sm:text-center text-3xl mb-4 font-bold text-white">
          Sticker.ly API Wrapper
        </h1>
        <p class="mb-8 text-lg text-center lg:text-left lg:text-xl text-primary-50 dark:text-primary-200/80">
          Unlock the full potential of Sticker.ly in your projects!<br>
          This unofficial API wrapper makes it easy to search, access, and integrate Sticker.ly stickers, packs, and more.<br>
          Perfect for developers looking to enhance their apps with rich sticker content.
        </p>
        <div class="flex justify-center gap-3 items-center">
          <!-- <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            Button
          </button> -->
          <UButton
            to="/getting-started"
            size="xl"
            variant="solid"
            class="text-primary-500 group relative overflow-hidden cursor-pointer"
            :ui="{
              base: 'bg-white hover:bg-primary-50 dark:bg-primary-500/15 dark:hover:bg-primary-500/20'
            }"
          >
            <span class="flex items-center gap-1">
              Get Started
              <span
                class="inline-flex transition-transform duration-300 transform group-hover:translate-x-1"
              >
                <Icon name="i-lucide-arrow-right" />
              </span>
            </span>
          </UButton>
          <UButton
            to="https://github.com/sergiooak/sticker-ly-api-wrapper"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-lucide-github"
            size="lg"
            color="neutral"
            variant="solid"
            class="cursor-pointer"
          >
            GitHub Repository
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
