import UserProfilePage from "@/components/user-profile-page"
import { AuroraBackground } from "@/components/aurora-background"

export default function Home() {
  return (
    <AuroraBackground>
      <div className="relative z-20 flex min-h-screen w-full items-center justify-center p-4">
        <UserProfilePage />
      </div>
    </AuroraBackground>
  )
}
