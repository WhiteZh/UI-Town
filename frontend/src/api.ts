import {CSSCategory, CSSStyle, User} from "@/constants";

export async function getValidCSSIds(options?: {
    category?: CSSCategory,
    limit?: number,
    offset?: number,
    order?: ("id" | "name" | "viewed_time")[],
}): Promise<number[]> {
    let res = await fetch('/api/css/valid', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) {
        throw Error((await res.json() as {error: string}).error);
    }
    return await res.json() as number[];
}

export async function getCSSByIds(ids: number[]): Promise<CSSStyle[]> {
    let res = await fetch(`/api/css?${ids.map(e => `id=${e}`).join('&')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw Error((await res.json() as {error: string}).error);
    }
    return await res.json() as CSSStyle[];
}

export async function getUserIdByLoginInfo(email: string, password_hashed: string): Promise<number|undefined> {
    let res = await fetch(`/api/users/login?email=${email}&password_hashed=${password_hashed}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw Error((await res.json() as {error: string}).error);
    }
    let id = await res.json() as number;
    return id > 0 ? id : undefined;
}

export async function createCSSStyle(userID: number, password_hashed: string, name: string, category: string, html: string, css: string): Promise<void> {
    let res = await fetch('/api/css', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID: userID,
            password_hashed: password_hashed,
            name: name,
            category: category,
            html: html,
            css: css,
        })
    });
    if (!res.ok) {
        throw Error((await res.json() as {error: string}).error);
    }
}

export async function deleteCSSStyle(id: number, password_hashed: string): Promise<void> {
    let res = await fetch(`/api/css?id=${id}&password_hashed=${password_hashed}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    if (!res.ok) {
        throw Error((await res.json() as {error: string}).error);
    }
}