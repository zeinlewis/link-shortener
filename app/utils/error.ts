import type { ApiErrorResponse } from "@/types/api"
import type { FetchError } from "ofetch"

/**
 * Extracts error message from API response
 * Works with errors from $fetch and useFetch
 */
export function getApiErrorMessage(error: unknown, defaultMessage = "An error occurred"): string {
	// Handle FetchError (from $fetch)
	if (error && typeof error === "object" && "data" in error) {
		const fetchError = error as FetchError
		return extractMessageFromData(fetchError.data, defaultMessage)
	}

	// Handle direct response (from useFetch)
	return extractMessageFromData(error, defaultMessage)
}

/**
 * Extracts message from data object
 */
function extractMessageFromData(data: unknown, defaultMessage: string): string {
	if (typeof data === "object" && data !== null) {
		const apiError = data as ApiErrorResponse

		// Priority: statusMessage > message > defaultMessage
		return apiError.statusMessage || apiError.message || defaultMessage
	}

	return defaultMessage
}
