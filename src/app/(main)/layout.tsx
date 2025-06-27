import { LargeNavbar, SmallNavbar } from "@/components/Layout/Nav"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full max-w-full overflow-x-hidden scroll-smooth">
            <main className="w-full">
                <SmallNavbar />
                <LargeNavbar />
                {children}
            </main>
        </div>
    )
}