<script lang="ts" setup>
import LinkList from "@/components/links/LinkList.vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLinksStore } from "@/stores/links"

const linksStore = useLinksStore()

const { links, pending, error: fetchError, refresh } = useFetchLinks()

const targetUrl = ref("")

const handleSubmit = async () => {
	if (!targetUrl.value.trim()) return

	try {
		linksStore.clearError()
		await linksStore.createLink({ targetUrl: targetUrl.value })
		targetUrl.value = ""

		// Обновляем список ссылок после создания новой
		await refresh()
	} catch (err) {
		console.error("Error shortening link:", err)
	}
}
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
		<div class="container mx-auto px-4 py-12 max-w-3xl">
			<!-- Заголовок страницы -->
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold text-slate-900 mb-3">Link Shortener</h1>
				<p class="text-slate-600">Transform long URLs into short, shareable links</p>
			</div>

			<!-- Форма ввода -->
			<div class="bg-white rounded-lg shadow-lg p-6 mb-8">
				<div class="flex gap-3">
					<Input
						v-model="targetUrl"
						placeholder="Enter your long URL here..."
						class="flex-1"
						:disabled="linksStore.loading"
						@keyup.enter="handleSubmit()"
					/>
					<Button
						:disabled="linksStore.loading || !targetUrl.trim()"
						class="px-6"
						@click="handleSubmit"
					>
						{{ linksStore.loading ? "Creating..." : "Shorten" }}
					</Button>
				</div>

				<!-- Ошибка создание ссылки -->
				<div
					v-if="linksStore.error"
					class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
				>
					<p class="text-red-600 text-sm">{{ linksStore.error }}</p>
				</div>

				<!-- Ошибка загрузки списка -->
				<div v-if="fetchError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
					<p class="text-red-600 text-sm">Failed to load links</p>
				</div>
			</div>

			<!-- Состояние загрузки -->
			<div v-if="pending" class="text-center py-12 bg-white rounded-lg shadow-md">
				<p class="text-slate-500">Loading links...</p>
			</div>

			<!-- Список ссылок -->
			<LinkList />
		</div>
	</div>
</template>
