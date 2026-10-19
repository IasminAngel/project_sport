import { HomePage } from "@/components/home-page";
import { atletas, curiosidades } from "@/lib/olympics";

export default function Page() {
  return <HomePage totalAtletas={atletas.length} totalCuriosidades={curiosidades.length} />;
}
