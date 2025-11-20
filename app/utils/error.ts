import type { ApiErrorResponse } from "@/types/api"
import type { FetchError } from "ofetch"

/**
 * Извлекает сообщение об ошибке из API response
 * Работает с ошибками от $fetch и useFetch
 */
export function getApiErrorMessage(error: unknown, defaultMessage = "An error occurred"): string {
	// Обработка FetchError (от $fetch)
	if (error && typeof error === "object" && "data" in error) {
		const fetchError = error as FetchError
		return extractMessageFromData(fetchError.data, defaultMessage)
	}

	// Обработка прямого response._data (от useFetch)
	return extractMessageFromData(error, defaultMessage)
}

/**
 * Внутренняя функция для извлечения сообщения из data
 */
function extractMessageFromData(data: unknown, defaultMessage: string): string {
	// Проверяем что data - это объект
	if (typeof data === "object" && data !== null) {
		// Приводим к типу ApiErrorResponse
		const apiError = data as ApiErrorResponse

		// Пытаемся взять сообщение в порядке приоритета:
		// 1. statusMessage (стандарт Nuxt)
		// 2. message (альтернативное поле)
		// 3. defaultMessage (если ничего нет)
		return apiError.statusMessage || apiError.message || defaultMessage
	}

	// Если data не объект - возвращаем дефолт
	return defaultMessage
}
