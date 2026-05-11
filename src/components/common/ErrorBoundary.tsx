'use client'

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { AlertTriangle, RotateCcw } from 'lucide-react'

function ErrorFallback({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-red-50 rounded-2xl border border-red-100">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-red-900 mb-2">Une erreur est survenue</h2>
      <p className="text-red-700 mb-6 max-w-md">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
      >
        <RotateCcw className="h-4 w-4" /> Réessayer
      </button>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
