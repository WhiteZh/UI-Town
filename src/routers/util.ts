export type ErrRes = {
    error: string
}

export function newErrRes(e: any) {
    return e instanceof Error ? e.message : "Something went wrong";
}