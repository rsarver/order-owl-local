import { Button } from "@/components/ui/button"
import { RefreshCw, LogOut, Package } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Order Owl</h1>
              <p className="text-sm text-gray-500">Gmail Package Tracker</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">user@gmail.com</div>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
