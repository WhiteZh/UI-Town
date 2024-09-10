export type ErrRes = {
    error: string
}

export function newErrRes(e: any) {
    return e instanceof Error ? e.message : "Something went wrong";
}

export function deleteUndefinedFields(o: object) {
    for (let _key in o) {
        let key = _key as keyof typeof o;
        if (o[key] === undefined) {
            delete o[key];
        }
    }
}