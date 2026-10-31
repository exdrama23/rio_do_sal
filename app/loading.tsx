export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
        <p className="text-sm text-stone-500">Carregando...</p>
      </div>
    </div>
  )
}
