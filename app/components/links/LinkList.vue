<script setup lang="ts">
import { useLinksStore } from "@/stores/links"
import { useShortUrl } from "~/composables/useLink"

const linksStore = useLinksStore()

const { getShortUrl, copyLink } = useShortUrl()

const copiedSlug = ref<string | null>(null)

// Функция копирования в буфер обмена
const handleCopy = async (slug: string) => {
	try {
		await copyLink(slug)

		copiedSlug.value = slug

		setTimeout(() => {
			copiedSlug.value = null
		}, 2000)
	} catch (err) {
		console.error("Failed to copy:", err)
	}
}
</script>

<template>
	<div>
		<div v-if="linksStore.links.length > 0" class="space-y-4">
			<h2 class="text-xl font-semibold text-slate-900 mb-4">Your Short Links</h2>

			<div
				v-for="link in linksStore.links"
				:key="link.id"
				class="bg-white rounded-lg shadow-md p-5"
			>
				<!-- Оригинальный URL -->
				<div class="mb-3">
					<label class="text-xs text-slate-500 uppercase mb-1 block"> Original URL </label>
					<!-- 
              :href - динамический атрибут, берем из link.targetUrl
              target="_blank" - открывается в новой вкладке
              break-all - длинный URL переносится на новую строку
            -->
					<a
						:href="link.targetUrl"
						target="_blank"
						class="text-slate-700 hover:text-blue-600 break-all"
					>
						{{ link.targetUrl }}
					</a>
				</div>

				<!-- Короткий URL с кнопкой копирования -->
				<div class="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
					<div class="flex-1">
						<label class="text-xs text-slate-500 uppercase mb-1 block"> Short URL </label>
						<!-- 
                <code> - моноширинный шрифт для URL
                getShortUrl(link.slug) - вызываем функцию для получения полного URL
              -->
						<code class="text-blue-600 font-mono">
							{{ getShortUrl(link.slug) }}
						</code>
					</div>

					<!-- 
              Кнопка копирования:
              @click - вызываем copyToClipboard при клике
              Условно показываем либо галочку (если скопировано), либо иконку копирования
            -->
					<Button variant="outline" size="sm" @click="handleCopy(link.slug)">
						<span v-if="copiedSlug === link.slug">✓ Copied!</span>
						<span v-else>Copy</span>
					</Button>
				</div>

				<!-- Метаданные (дата и клики) -->
				<div class="mt-3 flex gap-4 text-xs text-slate-500">
					<ClientOnly>
						<span>Created: {{ new Date(link.createdAt).toLocaleString() }}</span>
					</ClientOnly>
					<span>Clicks: {{ link.clicks }}</span>
				</div>
			</div>
		</div>
		<div v-else class="text-center py-12 bg-white rounded-lg shadow-md">
			<p class="text-slate-500">No links created yet. Enter a URL above to get started!</p>
		</div>
	</div>
</template>
