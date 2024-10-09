import Header from './components/header'
import Project from './components/project'
import Work from './components/work'
import About from './components/about'
import Footer from './components/footer'


export default function Home() {

  return (
    <main>
      <Header />
      <About />
      <Work />
      <Project />
      <Footer />
    </main>
  )
}
