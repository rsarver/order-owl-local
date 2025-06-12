import { Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Package className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No shipments found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We haven't found any shipping emails in your Gmail yet. Try refreshing to scan for new emails, or make sure you
        have shipping notifications enabled.
      </p>
      <div className="space-y-3">
        <Button className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>Scan Gmail for Shipments</span>
        </Button>
        <p className="text-sm text-gray-500">We'll look for emails from DHL, PostNL, and other carriers</p>
      </div>
    </div>
  )
}
