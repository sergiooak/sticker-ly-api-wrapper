<script setup lang="ts">
useSeoMeta({
  titleTemplate: '',
  title: 'Sticker.ly API Wrapper',
  ogTitle: 'Sticker.ly API Wrapper',
  description: 'Effortlessly search, discover, and integrate Sticker.ly stickers and packs into your apps with this unofficial API wrapper.',
  ogDescription: 'Effortlessly search, discover, and integrate Sticker.ly stickers and packs into your apps with this unofficial API wrapper.'
})

const features = [
  {
    icon: 'i-lucide-search',
    to: '/endpoints/stickers#search',
    title: 'Powerful Sticker Search',
    description: 'Instantly find stickers by keyword, get recommendations, and explore related stickers.'
  },
  {
    icon: 'i-lucide-package',
    to: '/endpoints/packs#search',
    title: 'Discover Sticker Packs',
    description: 'Browse packs by keyword or ID, and find related or recommended packs with ease.'
  },
  {
    icon: 'i-lucide-sparkles',
    to: '/endpoints/tags#trending',
    title: 'Trending Tags',
    description: 'Access trending tags and discover recommended tags and artists.'
  },
  {
    icon: 'i-lucide-tag',
    to: '/endpoints/tags#search',
    title: 'Tag Explorer',
    description: 'Search for tags and get recommendations to discover new sticker content.'
  },
  {
    icon: 'i-lucide-link-2',
    to: '/endpoints/stickers#related-by-id',
    title: 'Related Stickers',
    description: 'Find stickers and packs related to your favorites or searches by ID.'
  },
  {
    icon: 'i-lucide-user',
    to: '/endpoints/artists#recommended',
    title: 'Recommended Artists',
    description: 'Discover recommended and trending artists.'
  }
]
</script>

<template>
  <div>
    <HomeHero />

    <UPageSection
      title="Why Use the Sticker.ly API Wrapper?"
      class="mt-8"
    >
      <UPageGrid :cols="{ base: 1, sm: 2, md: 3 }">
        <UPageFeature
          v-for="(feature, idx) in features"
          :key="idx"
          v-bind="feature"
        />
      </UPageGrid>
    </UPageSection>
  </div>
</template>
