<script lang="ts" setup>
import { useCounterStore } from "./stores/counter"

const counter = useCounterStore()
</script>

<template>
	<div>
		<h2 class="text-3xl font-bold underline">Counter: {{ counter.count }}</h2>
		<button @click="counter.increment">Increment</button>
		<button @click="counter.decrement">Decrement</button>

		<h1 class="text-2xl">Link Shortener</h1>
		<p>Shorten your links easily and quickly!</p>
		<div>
			<p>Enter your URL below:</p>
			<input type="text" placeholder="https://example.com" />
		</div>

		<ul>
			<li>Shortened URL 1</li>
			<li>Shortened URL 2</li>
			<li>Shortened URL 3</li>
		</ul>
	</div>
</template>
