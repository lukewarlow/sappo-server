import bcrypt from "bcrypt";

export async function hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
}

export async function compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
