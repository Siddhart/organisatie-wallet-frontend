import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//components
import NavBar from "./navbar/NavBar";

//packages
import Cookies from 'universal-cookie';

export default function Layout({ children }) {
    const router = useRouter();
    const cookies = new Cookies();
    const [isAuthPath, setIsAuthPath] = useState(false);
    const [isDemoPath, setIsDemoPath] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        setIsAuthPath(router.asPath.includes("/auth"));
        setIsDemoPath(router.asPath.startsWith("/demo"));
    }, [router.isReady, router.asPath]);

    useEffect(() => {
        const checkSession = () => {
            const session = cookies.get("session");
            if (session && router.asPath.includes("/auth")) {
                window.location.href = "/";
            } else if (!session && !router.asPath.includes("/auth") && !router.asPath.startsWith("/demo")) {
                router.push("/auth/login");
            }
        };

        checkSession();
        const interval = setInterval(checkSession, 500);

        return () => clearInterval(interval);
    }, [router, router.isReady]);

    if (isAuthPath || isDemoPath) {
        return <main>{children}</main>;
    }

    return (
        <div className="bg-[#F5F4F9] h-screen w-screen flex flex-row">
            <NavBar />
            <main className="flex flex-1 w-full py-4 pr-4">
                <div className='flex flex-1 w-full bg-white p-6 rounded-2xl overflow-hidden'>
                    {children}
                </div>
            </main>
        </div>
    );
}
