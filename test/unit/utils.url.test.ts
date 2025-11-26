import { describe, it, expect } from "vitest"
import { isValidUrl } from "../../app/utils/url"

describe("isValidUrl", () => {
	it("should return true for valid URLs", () => {
		expect(isValidUrl("http://example.com")).toBe(true)
		expect(isValidUrl("https://example.com")).toBe(true)
		expect(isValidUrl("https://www.example.com/path?query=string#hash")).toBe(true)
	})

	it("should return false for invalid URLs", () => {
		expect(isValidUrl("not a url")).toBe(false)
		expect(isValidUrl("")).toBe(false)
	})
})
