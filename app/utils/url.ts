/**
 * Утилиты для работы с URL
 */

/**
 * Проверяет валидность URL
 * @param url - URL для проверки
 * @returns true если URL валидный
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url)
		return true
	} catch {
		return false
	}
}
