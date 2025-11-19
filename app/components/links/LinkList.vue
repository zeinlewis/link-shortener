<script setup lang="ts">
import { useLinksStore } from "@/stores/links"
const linksStore = useLinksStore()

const copiedSlug = ref<string | null>(null)

// useRequestURL() - Nuxt composable, работает и на сервере, и на клиенте
// Возвращает полный URL текущего запроса
const currentUrl = useRequestURL()

// Берем origin из requestURL (протокол + хост)
// Например: "http://localhost:3000" или "https://yourdomain.com"
const origin = currentUrl.origin

// Функция генерирует полный URL для короткой ссылки
// window.location.origin = "http://localhost:3000" - Результат: "http://localhost:3000/r/abc123"
const getShortUrl = (slug: string) => {
	return `${origin}/${slug}`
}

// Функция копирования в буфер обмена
const copyToClipboard = async (slug: string) => {
	try {
		// navigator.clipboard - современный API браузера для копирования
		await navigator.clipboard.writeText(getShortUrl(slug))

		// Устанавливаем скопированный slug, чтобы показать "Copied!"
		copiedSlug.value = slug

		// Через 2 секунды сбрасываем состояние "скопировано"
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
					<Button variant="outline" size="sm" @click="copyToClipboard(link.slug)">
						<span v-if="copiedSlug === link.slug">✓ Copied!</span>
						<span v-else>Copy</span>
					</Button>
				</div>

				<!-- Метаданные (дата и клики) -->
				<div class="mt-3 flex gap-4 text-xs text-slate-500">
					<!-- 
              new Date(link.createdAt).toLocaleString() - конвертируем ISO дату
              в читаемый формат типа "17.11.2025, 14:30:00"
            -->
					<span>Created: {{ new Date(link.createdAt).toLocaleString() }}</span>
					<span>Clicks: {{ link.clicks }}</span>
				</div>
			</div>
		</div>
		<div v-else class="text-center py-12 bg-white rounded-lg shadow-md">
			<p class="text-slate-500">No links created yet. Enter a URL above to get started!</p>
		</div>
	</div>
</template>
