import { LargeNavbar, SmallNavbar } from "@/components/Layout/Nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SmallNavbar />
      <LargeNavbar />
      <main className="container">
        {children}
      </main>
    </div>
  )
}