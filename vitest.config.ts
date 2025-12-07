import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'url'

export default defineConfig({
	test: {
		projects: [
			{
				resolve: {
                    alias: {
                        '@': fileURLToPath(new URL('./app', import.meta.url)),
                        '~': fileURLToPath(new URL('./app', import.meta.url)),
                        '#app': fileURLToPath(new URL('./.nuxt', import.meta.url)),
                    },
                },
				test: {
					name: 'unit',
					include: ['test/{e2e,unit}/*.{test,spec}.ts'],
          		environment: 'node',
				}
			},
			await defineVitestProject({
				test: {
					name: 'nuxt',
					include: ['test/nuxt/*.{test,spec}.ts'],
					environment: 'nuxt',
				},
			}),
		]
	}
})