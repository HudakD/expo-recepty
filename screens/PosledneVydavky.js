import { useContext } from "react";
import ZobrazenieVydavkov from "../components/ZobrazenieVydavkov";
import { VydavkyContext } from "../store/vydavky-context";

export default function PosledneVydavky() {
  const vydavkyCtx = useContext(VydavkyContext);

  // filtrovanie výdavkov za posledných 7 dní
  const dnes = new Date();
  const sedemDniSpat = new Date(
    dnes.getFullYear(),
    dnes.getMonth(),
    dnes.getDate() - 7
  );

  const posledneVydavky = vydavkyCtx.vydavky.filter((vydavok) => {
    return vydavok.datum >= sedemDniSpat && vydavok.datum <= dnes;
  });

  return (
    <ZobrazenieVydavkov
      vydavky={posledneVydavky}
      pocetDniVydavkov="Posledných 7 dní"
    />
  );
}
