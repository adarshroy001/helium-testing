import Navbar from "@/components/Layout/Nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">
        {children}
      </main>
    </div>
  )
}