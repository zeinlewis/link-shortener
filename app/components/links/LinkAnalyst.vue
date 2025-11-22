<script lang="ts" setup>
const { totalLinks, totalClicks, topLink } = useLinksStore()

const getShortUrl = (slug: string) => {
	return `${window.location.origin}/${slug}`
}
</script>

<template>
	<div class="bg-white rounded-lg shadow-lg p-6 mb-8">
		<!-- Заголовок -->
		<h2 class="text-2xl font-bold text-slate-900 mb-6">Statistics</h2>

		<!-- Статистика в карточках -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
			<!-- Total Links -->
			<div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
				<p class="text-sm font-medium text-blue-600 mb-1">Total Links</p>
				<p class="text-3xl font-bold text-blue-900">{{ totalLinks }}</p>
			</div>

			<!-- Total Clicks -->
			<div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
				<p class="text-sm font-medium text-green-600 mb-1">Total Clicks</p>
				<p class="text-3xl font-bold text-green-900">{{ totalClicks }}</p>
			</div>
		</div>

		<!-- Top Link -->
		<div v-if="topLink" class="border-2 border-slate-200 rounded-lg p-4 bg-slate-50">
			<div class="flex items-center gap-2 mb-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-amber-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
				<h3 class="text-lg font-semibold text-slate-900">Top Performing Link</h3>
			</div>

			<div class="space-y-2">
				<!-- Target URL -->
				<div>
					<p class="text-xs font-medium text-slate-500 mb-1">Original URL</p>
					<a
						:href="topLink.targetUrl"
						target="_blank"
						class="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all"
					>
						{{ topLink.targetUrl }}
					</a>
				</div>

				<!-- Short URL -->
				<div>
					<p class="text-xs font-medium text-slate-500 mb-1">Short URL</p>
					<a
						:href="getShortUrl(topLink.slug)"
						target="_blank"
						class="text-sm text-blue-600 hover:text-blue-700 hover:underline font-mono"
					>
						{{ getShortUrl(topLink.slug) }}
					</a>
				</div>

				<!-- Clicks -->
				<div class="pt-2 border-t border-slate-200">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-slate-500">Clicks</span>
						<span class="text-lg font-bold text-slate-900">{{ topLink.clicks }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Fallback если нет ссылок -->
		<div v-else class="text-center py-8 text-slate-400">
			<p>No links created yet</p>
		</div>
	</div>
</template>
