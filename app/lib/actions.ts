'use server';

import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { randomUUID } from 'crypto';
import bcryptjs from 'bcryptjs';
import { db } from '@vercel/postgres';
import { User } from './types';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getUser(email: string): Promise<User | undefined> {
    const client = await db.connect();

    try {
        const user = await client.sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function signUpAndAuthenticate(
    prevState: string | undefined,
    formData: FormData,
) {

    const email = formData.get('email');
    if (email) {
        const user = await getUser(email.toString())
        if (user) {
            return 'User with this email already exists.'
        } else {
            const id = randomUUID();
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');
            if (password && confirmPassword && password.toString() === confirmPassword.toString()) {
                const hashedPassword = await bcryptjs.hash(password.toString(), 10);
                try {
                    await sql`
                    INSERT INTO users (id, name, jobTitle, email, password)
                    VALUES (${id}, ${''}, ${''}, ${email?.toString()}, ${hashedPassword})
                  `;
                } catch (error) {
                    console.log('Failed to add new user', error)
                    return 'Failed to add new user. Try again.';
                }

                return authenticate(undefined, formData);
            } else {
                return 'Passwords do not match.';
            }
        }
    } else {
        return 'Email is missing.';
    }
}

export async function updateUser(
    prevState: { status: boolean; error?: string } | undefined,
    formData: FormData,
) {

    const email = formData.get('email')?.toString();
    if (email) {
        const user = await getUser(email)
        if (user) {
            const name = formData.get('name')?.toString();
            const jobTitle = formData.get('jobTitle')?.toString();
            await sql`
            UPDATE users
            SET name = ${name}, jobTitle = ${jobTitle}
            WHERE email = ${email}
          `;
            return { status: true };
        } else {
            return { status: false, error: 'User not found.' }
        }
    } else {
        return { status: false, error: 'Email is missing.' }
    }
}