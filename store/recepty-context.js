import { createContext, useReducer } from "react";

const MOCK_RECEPTY = [
  {
    id: "r1",
    nazov: "Cestoviny s pestom",
    cas: 20,
    kategoria: "Rychla vecera",
    suroviny: "cestoviny, bazalkove pesto, parmezan, cherry paradajky",
    postup: "Uvar cestoviny, zmiesaj ich s pestom a podavaj s parmezanom.",
    oblubeny: true,
  },
  {
    id: "r2",
    nazov: "Kuracia polievka",
    cas: 60,
    kategoria: "Polievka",
    suroviny: "kuracie maso, mrkva, petrzlen, zeler, rezance",
    postup: "Maso a zeleninu pomaly var vo vode. Nakoniec pridaj rezance.",
    oblubeny: false,
  },
  {
    id: "r3",
    nazov: "Tvarohove lievance",
    cas: 25,
    kategoria: "Ranajky",
    suroviny: "tvaroh, vajcia, muka, mlieko, med",
    postup: "Vymiesaj cesto, opekaj male lievance a podavaj s medom.",
    oblubeny: true,
  },
];

export const ReceptyContext = createContext({
  recepty: [],
  pridatRecept: ({ nazov, cas, kategoria, suroviny, postup, oblubeny }) => {},
  upravitRecept: (id, { nazov, cas, kategoria, suroviny, postup, oblubeny }) => {},
  zmazatRecept: (id) => {},
});

function receptyReducer(stavReceptov, action) {
  switch (action.type) {
    case "PRIDAT":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...stavReceptov];

    case "UPRAVIT":
      const index = stavReceptov.findIndex(
        (recept) => recept.id === action.payload.id
      );
      const aktualizovaneRecepty = [...stavReceptov];
      aktualizovaneRecepty[index] = {
        ...aktualizovaneRecepty[index],
        ...action.payload.data,
      };
      return aktualizovaneRecepty;

    case "ZMAZAT":
      return stavReceptov.filter((recept) => recept.id !== action.payload);

    default:
      return stavReceptov;
  }
}

export default function ReceptyContextProvider({ children }) {
  const [receptyStav, dispatch] = useReducer(receptyReducer, MOCK_RECEPTY);

  function pridatRecept(receptData) {
    dispatch({ type: "PRIDAT", payload: receptData });
  }

  function upravitRecept(id, receptData) {
    dispatch({ type: "UPRAVIT", payload: { id: id, data: receptData } });
  }

  function zmazatRecept(id) {
    dispatch({ type: "ZMAZAT", payload: id });
  }

  const value = {
    recepty: receptyStav,
    pridatRecept: pridatRecept,
    upravitRecept: upravitRecept,
    zmazatRecept: zmazatRecept,
  };

  return (
    <ReceptyContext.Provider value={value}>{children}</ReceptyContext.Provider>
  );
}
