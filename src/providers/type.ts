export type CustomDataprovider<T> = {
    getList: (
        page: number,
        pageSize: number,
        filter: any,
        sort: any,
        meta: any
    ) => Promise<T[]>;
    getOne: (id: string, meta: any) => Promise<T>;
    create: (payload: T | any, meta: any) => Promise<T>;
    update: (payload: T | any, meta: any) => Promise<T>;
    delete: (id: string, meta: any) => Promise<T>;
};
