<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { data: link, error } = await useFetch(`/api/links/${slug}`)

// Если ссылка не найдена - редирект на главную или показываем 404
if (error.value || !link.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Short link not found",
	})
}

// Если ссылка найдена - делаем редирект на targetUrl
// external: true - для внешних ссылок
// redirectCode: 302 - временный редирект
await navigateTo(link.value.targetUrl, {
	external: true,
	redirectCode: 302,
})
</script>
