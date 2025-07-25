import { DashboardLayout } from "@/components/dashboard-layout"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Workspace with exact dimensions */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          position: 'absolute',
          width: '510px',
          height: '510px',
          left: '343px',
          top: '87px',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/suchama-chat-bg.jpeg"
            alt="Chat Interface Background"
            width={1094}
            height={671}
            className="object-contain opacity-100 blur-[0.0px]"
            priority
          />
        </div>
        {/* Gradient overlay to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50 opacity-80"></div>
      </div>
    </DashboardLayout>
  )
}
