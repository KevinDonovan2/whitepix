import NavBar from '@/layout/NavBar';
import Contact from './Contact';

export default function ContactPage() {
    return (
        <div className="flex flex-col primary h-screen">
            <div>
                <NavBar />
            </div>
            <div className="rounded-2xl m-4 flex flex-row">
                <Contact />
            </div>
        </div>
    );
}
