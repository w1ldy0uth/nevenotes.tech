import { db } from '../src/lib/server/db';
import { users } from '../src/lib/server/db/schema';
import { hashPassword } from '../src/lib/server/auth';

const [email, password] = process.argv.slice(2);

if (!email || !password) {
	console.error('Usage: bun run scripts/create-admin.ts <email> <password>');
	process.exit(1);
}

const passwordHash = await hashPassword(password);

await db.insert(users).values({ email, passwordHash });

console.log(`Admin user created: ${email}`);
process.exit(0);
