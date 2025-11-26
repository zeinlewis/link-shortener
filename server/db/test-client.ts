import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

const turso = createClient({
	url: ":memory:",
})

export const testDb = drizzle(turso)
