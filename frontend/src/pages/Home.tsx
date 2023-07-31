import Hero from "../components/Hero"
import AuthenticatedLayout from "../layout/AuthenticatedLayout"

function Home() {
  return (
    <AuthenticatedLayout>
    <div>
        <Hero />
    </div>
    </AuthenticatedLayout>
  )
}

export default Home