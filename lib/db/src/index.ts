import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let pool: pg.Pool;
let db: ReturnType<typeof drizzle>;

if (process.env.DATABASE_URL) {
  // Real database mode
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  // Development mock mode - no database required
  console.warn("⚠️  DATABASE_URL not set. Using in-memory mock database for development.");
  
  // In-memory mock database
  const mockUsers: Array<{
    id: number;
    username: string;
    password: string;
    name: string;
    role: string;
    email: string | null;
    department: string | null;
    createdAt: Date;
  }> = [
    {
      id: 1,
      username: "demo",
      password: "demo123",
      name: "Demo User",
      role: "Plant Supervisor",
      email: "demo@forgepulse.local",
      department: "Operations",
      createdAt: new Date(),
    },
    {
      id: 2,
      username: "admin",
      password: "admin123",
      name: "Admin User",
      role: "Administrator",
      email: "admin@forgepulse.local",
      department: "Management",
      createdAt: new Date(),
    },
  ];

  let nextUserId = 3;

  // Create mock db proxy that simulates drizzle API
  db = {
    select: () => ({
      from: (table: any) => ({
        where: (condition: any) => {
          // Simulate WHERE queries
          if (condition.toString().includes("username")) {
            const username = condition.value;
            return Promise.resolve(mockUsers.filter((u) => u.username === username));
          }
          if (condition.toString().includes("id")) {
            const id = condition.value;
            return Promise.resolve(mockUsers.filter((u) => u.id === id));
          }
          return Promise.resolve(mockUsers);
        },
      }),
    }),
    insert: (table: any) => ({
      values: (data: any) => ({
        returning: () => {
          const newUser = {
            ...data,
            id: nextUserId++,
            createdAt: new Date(),
          };
          mockUsers.push(newUser);
          return Promise.resolve(newUser);
        },
      }),
    }),
  } as any;
}

export const usersTable = schema.usersTable;
export { db };
export * from "./schema";
