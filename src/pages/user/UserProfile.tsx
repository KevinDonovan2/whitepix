import { Admin, Resource } from 'react-admin';
import { UserList } from '../../features/user/UserList';
import dataProvider from '@/providers/dataProvider';

export default function UserProfile() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
        </Admin>
    );
}
