import { useContext } from "react";
import ZobrazenieVydavkov from "../components/ZobrazenieVydavkov";
import { VydavkyContext } from "../store/vydavky-context";

export default function VsetkyVydavky() {
  const vydavkyCtx = useContext(VydavkyContext);

  return (
    <ZobrazenieVydavkov
      vydavky={vydavkyCtx.vydavky}
      pocetDniVydavkov="Zobrazenie všetkých dní"
    />
  );
}
