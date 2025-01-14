import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import SideBarDash from './components/SideBarDash';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

function Dashboard() {
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [userName, setName] = useState<string | null>(null);
    useEffect(() => {
        const storedPhoto = localStorage.getItem('userPhoto');
        if (storedPhoto && storedPhoto !== 'null') {
            setUserPhoto(storedPhoto);
        } else {
            setUserPhoto(null);
        }
    }, []);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName && storedName !== 'null') {
            setName(storedName);
        } else {
            setName('Pas de Nom');
        }
    }, []);

    return (
        <DrawerProvider>
            <DashBar />
            <div className="flex flex-row bg-gray-100 h-screen w-full">
                <SideBarDash />
                <div className="w-full flex flex-row gap-6 justify-center items-center">
                    <form className="space-y-4">
                        <h2 className="text-xl font-semibold ">
                            Modify your profile
                        </h2>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium"
                            >
                                Name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="New Name"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1"
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium"
                                >
                                    Photo
                                </label>
                                <Input
                                    id="photo"
                                    type=""
                                    placeholder="url_image from drive upload"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium"
                                >
                                    Phone number
                                </label>
                                <Input
                                    id="message"
                                    placeholder="+261*****"
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium"
                            >
                                Password confirm all change
                            </label>
                            <Input
                                id="message"
                                placeholder="*****"
                                className="mt-1"
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" className="w-full md:w-auto">
                                Save change
                            </Button>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <img
                            src={
                                userPhoto ||
                                'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                            }
                            alt=""
                            className="h-[40vh] rounded-lg"
                        />
                        <ul className="space-y-2">
                            <li className="p-2 border-2 border-amber-400 rounded-3xl">
                                {userName}
                            </li>
                            <li className="p-2 border-2 border-amber-400 rounded-3xl">
                                0339933399
                            </li>
                            <li className="p-2 border-2 border-amber-400 rounded-3xl">
                                email@bob.com
                            </li>
                            <li className="p-2 border-2 border-amber-400 rounded-3xl">
                                Dte de creation du compte
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DrawerProvider>
    );
}

export default Dashboard;
