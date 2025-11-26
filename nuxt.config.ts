// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || 'http://localhost:3000',
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@pinia/nuxt',
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
	],
	shadcn: {
		prefix: '',
		componentDir: '~/components/ui',
	},
});
