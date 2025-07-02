<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface ApiStats {
  total_requests: number
  unique_ips: number
  avg_response_time: number
  error_rate: number
  top_endpoints: Array<{ route_id: string, count: number }>
}

const stats = ref<ApiStats | null>(null)

async function fetchStats() {
  const { data } = await useFetch('/api/stats', { query: { timeframe: '1m' } })
  if (data.value && data.value.status === 'success') {
    stats.value = data.value.data
  }
}

let timer: NodeJS.Timer

onMounted(() => {
  fetchStats()
  timer = setInterval(fetchStats, 60_000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

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
    <UPageHero orientation="vertical">
      <template #title>
        Sticker.ly API Wrapper
      </template>

      <template #description>
        Unlock the full potential of Sticker.ly in your projects! This unofficial API wrapper makes it easy to search, access, and integrate Sticker.ly stickers, packs, and more. Perfect for developers looking to enhance their apps with rich sticker content.
      </template>

      <template #links>
        <UButton
          size="xl"
          to="/getting-started"
          trailing-icon="i-lucide-arrow-right"
        >
          Get Started
        </UButton>
        <UButton
          color="neutral"
          icon="i-simple-icons-github"
          size="xl"
          to="https://github.com/sergiooak/sticker-ly-api-wrapper"
          variant="subtle"
        >
          GitHub Repository
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="API Usage (last minute)"
      class="mt-8"
    >
      <template #default>
        <template v-if="stats">
          <UPageGrid :cols="{ base: 1, sm: 2, md: 4 }">
            <UCard class="text-center">
              <template #header>
                Total Requests
              </template>
              <p class="text-3xl font-bold">
                {{ stats.total_requests }}
              </p>
            </UCard>
            <UCard class="text-center">
              <template #header>
                Unique IPs
              </template>
              <p class="text-3xl font-bold">
                {{ stats.unique_ips }}
              </p>
            </UCard>
            <UCard class="text-center">
              <template #header>
                Avg. Response (ms)
              </template>
              <p class="text-3xl font-bold">
                {{ stats.avg_response_time }}
              </p>
            </UCard>
            <UCard class="text-center">
              <template #header>
                Error Rate (%)
              </template>
              <p class="text-3xl font-bold">
                {{ stats.error_rate }}
              </p>
            </UCard>
          </UPageGrid>
        </template>
        <template v-else>
          <div class="text-center py-8">
            <ULoadingIcon />
          </div>
        </template>
      </template>
    </UPageSection>

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

    <UPageSection
      title="Get Started in Minutes"
      class="mt-8"
    >
      <template #description>
        Check out the documentation to learn how to install, configure, and use the Sticker.ly API Wrapper in your project. Whether you want to search for stickers, browse packs, or explore trending content, everything you need is just a click away.
      </template>
      <template #links>
        <UButton
          size="lg"
          to="/getting-started"
          trailing-icon="i-lucide-arrow-right"
        >
          Read the Docs
        </UButton>
      </template>
    </UPageSection>
  </div>
</template>
