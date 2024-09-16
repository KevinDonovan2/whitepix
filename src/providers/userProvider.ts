import { CustomDataprovider as ICustomDataprovider } from './type';
import { get } from './utils';

const generateId = (item: any) => {
    return `${item.nom}-${item.possesseur.nom}-${item.t}`;
};

type User = {
    id?: string;
    name: string;
    email: string;
    photo: string;
    created_at: Date;
};

export const userProvider: ICustomDataprovider<User> = {
    getList: () => {
        return get<{ data: User[] }>('patrimoines').then((response) =>
            response.data.data.map((item) => ({
                ...item,
                id: generateId(item)
            }))
        );
    },
    getOne: () => {
        return Promise.reject(new Error('Method not implemented.'));
    },
    create: () => {
        return Promise.reject(new Error('Method not implemented.'));
    },
    update: () => {
        return Promise.reject(new Error('Method not implemented.'));
    },
    delete: () => {
        return Promise.reject(new Error('Method not implemented.'));
    }
};
