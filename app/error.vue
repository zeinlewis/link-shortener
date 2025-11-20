<script setup lang="ts">
const props = defineProps<{
	error: { statusCode: number; message: string }
}>()

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
	<div
		class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4"
	>
		<div class="text-center max-w-md">
			<!-- Error Code -->
			<div class="mb-8">
				<h1 class="text-9xl font-bold text-slate-900 mb-2">
					{{ error.statusCode }}
				</h1>
				<div class="h-1 w-24 bg-slate-900 mx-auto rounded-full"></div>
			</div>

			<!-- Error Message -->
			<p class="text-xl text-slate-600 mb-8">
				{{ error.message || "Something went wrong" }}
			</p>

			<!-- Action Button -->
			<button
				@click="handleError"
				class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				Back to Home
			</button>
		</div>
	</div>
</template>
