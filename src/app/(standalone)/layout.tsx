import { LargeNavbar } from "@/components/Layout/Nav"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
            <LargeNavbar />
      <div className="container">
        {children}
      </div>
    </div>
  )
}
