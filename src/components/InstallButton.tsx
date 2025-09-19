import { useInstallPrompt } from '../hooks/useInstallPrompt'

export function InstallButton() {
  const { canInstall, promptInstall } = useInstallPrompt()

  if (!canInstall) return null

  return (
    <button
      onClick={promptInstall}
      className="
        fixed bottom-4 right-4
        bg-blue-600 hover:bg-blue-700
        text-white font-medium
        px-4 py-2 rounded-lg shadow-lg
        transition-colors
      "
    >
      Instalar App
    </button>
  )
}
