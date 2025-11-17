<script lang="ts" setup>
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLinksStore } from "~/stores/links"
const linksStore = useLinksStore()

const targetUrl = ref("")

const handleSubmit = async () => {
	try {
		await linksStore.createLink({ targetUrl: targetUrl.value })
		targetUrl.value = ""
	} catch (err) {
		console.error("Error shortening link:", err)
	}
}
</script>

<template>
	<div class="container p-6 flex gap-6">
		<Input v-model="targetUrl" placeholder="Enter URL" />
		<Button :disabled="linksStore.loading" @click="handleSubmit">
			{{ linksStore.loading ? "Loading..." : "Create Link" }}
		</Button>

		<p v-if="linksStore.error" class="error">{{ linksStore.error }}</p>

		<div v-for="link in linksStore.links" :key="link.id">
			{{ link.targetUrl }} -> {{ link.slug }}
		</div>
	</div>
</template>
