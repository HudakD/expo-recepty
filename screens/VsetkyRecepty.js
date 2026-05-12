import { useContext } from "react";

import ZobrazenieReceptov from "../components/ZobrazenieReceptov";
import { ReceptyContext } from "../store/recepty-context";

export default function VsetkyRecepty() {
  const receptyCtx = useContext(ReceptyContext);

  return (
    <ZobrazenieReceptov
      recepty={receptyCtx.recepty}
      nadpis="Moje recepty"
      prazdnyText="Zatial tu nie je ziaden recept."
    />
  );
}
