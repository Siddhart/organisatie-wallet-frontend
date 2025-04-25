import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//components
import NavBar from "./navbar/NavBar";

//packages
import Cookies from 'universal-cookie';

// Public routes that don't require authentication
const publicRoutes = ['/auth', '/demo', '/onboarding'];

export default function Layout({ children }) {
    const router = useRouter();
    const cookies = new Cookies();
    const [isPublicPath, setIsPublicPath] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        setIsPublicPath(publicRoutes.some(route => router.asPath.startsWith(route)));
    }, [router.isReady, router.asPath]);

    useEffect(() => {
        const checkSession = () => {
            const session = cookies.get("session");
            const isCurrentPathPublic = publicRoutes.some(route => router.asPath.startsWith(route));
            
            if (session && router.asPath.includes("/auth")) {
                window.location.href = "/";
            } else if (!session && !isCurrentPathPublic) {
                router.push("/auth/login");
            }
        };

        if (router.isReady) {
            checkSession();
            const interval = setInterval(checkSession, 500);
            return () => clearInterval(interval);
        }
    }, [router, router.isReady]);

    if (isPublicPath) {
        return <main>{children}</main>;
    }

    return (
        <div className="bg-[#F5F4F9] h-screen w-screen flex flex-row">
            <NavBar />
            <main className="flex flex-1 w-full md:py-4 md:pr-4">
                <div className='flex flex-1 w-full bg-white p-4 md:p-6 md:rounded-2xl md:overflow-hidden'>
                    {children}
                </div>
            </main>
        </div>
    );
}
