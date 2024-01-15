'use server'

import { randomUUID } from "crypto";
import { User } from "./types";
import { db, sql } from '@vercel/postgres';

export async function getUser(): Promise<User | undefined> {
    const client = await db.connect();

    try {
        const users = await client.sql<{ id: string; name: string; jobtitle: string }>`SELECT * FROM users`;
        if (!users.rows[0]) return undefined;
        const { id, name, jobtitle } = users.rows[0];
        return {
            id,
            name,
            jobTitle: jobtitle,
        };
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function createUser(name: string, jobTitle: string) {
    const id = randomUUID();
    try {
        await sql`
                    INSERT INTO users (id, name, jobtitle)
                    VALUES (${id}, ${name}, ${jobTitle})
                  `;
    } catch (error) {
        console.log('Failed to add new user', error)
        return 'Failed to add new user. Try again.';
    }
}

export async function updateUser(
    prevState: { status: boolean; error?: string } | undefined,
    formData: FormData,
) {
    const user = await getUser();
    if (user) {
        const name = formData.get('name')?.toString();
        const jobTitle = formData.get('jobTitle')?.toString();
        await sql`
            UPDATE users
            SET name = ${name}, jobTitle = ${jobTitle}
            WHERE id = ${user.id}
          `;
        return { status: true };
    } else {
        return { status: false, error: 'User not found.' }
    }
}

export async function deleteUser() {
    const user = await getUser();
    if (user) {
        await sql`
            DELETE FROM users
            WHERE id = ${user.id}
          `;
        return { status: true };
    } else {
        return { status: false, error: 'User not found.' }
    }
}