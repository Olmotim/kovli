import Hero from "@/components/home/Hero";
import Secciones from "@/components/home/Secciones";
import Organizaciones from "@/components/home/Organizaciones";
import LoadingScreen from "@/components/ui/LoadingScreen";
export default function Home() {
  return (
  <>
  <LoadingScreen/>
  <Hero/>
  <Secciones/>
  <Organizaciones/>
  </>
  );
}
