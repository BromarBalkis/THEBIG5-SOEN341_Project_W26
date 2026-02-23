'use client'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-bold text-primary">MealMajor</h1>
      </div>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
