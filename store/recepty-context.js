import { createContext, useEffect, useReducer, useState } from "react";

import {
  aktualizujRecept,
  nacitajRecepty,
  odstranRecept,
  ulozRecept,
} from "../util/firebase";

export const ReceptyContext = createContext({
  recepty: [],
  nacitavaSa: false,
  chyba: null,
  nacitatRecepty: () => {},
  pridatRecept: ({ nazov, cas, kategoria, suroviny, postup, oblubeny }) => {},
  upravitRecept: (id, { nazov, cas, kategoria, suroviny, postup, oblubeny }) => {},
  zmazatRecept: (id) => {},
});

function receptyReducer(stavReceptov, action) {
  switch (action.type) {
    case "NASTAVIT":
      return action.payload;

    case "PRIDAT":
      return [action.payload, ...stavReceptov];

    case "UPRAVIT":
      const index = stavReceptov.findIndex(
        (recept) => recept.id === action.payload.id
      );

      if (index < 0) {
        return stavReceptov;
      }

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
  const [receptyStav, dispatch] = useReducer(receptyReducer, []);
  const [nacitavaSa, setNacitavaSa] = useState(true);
  const [chyba, setChyba] = useState(null);

  useEffect(() => {
    nacitatRecepty();
  }, []);

  async function nacitatRecepty() {
    setNacitavaSa(true);
    setChyba(null);

    try {
      const recepty = await nacitajRecepty();
      dispatch({ type: "NASTAVIT", payload: recepty });
    } catch (error) {
      setChyba("Recepty sa nepodarilo nacitat.");
    }

    setNacitavaSa(false);
  }

  async function pridatRecept(receptData) {
    const ulozenyRecept = await ulozRecept(receptData);
    dispatch({ type: "PRIDAT", payload: ulozenyRecept });
  }

  async function upravitRecept(id, receptData) {
    await aktualizujRecept(id, receptData);
    dispatch({ type: "UPRAVIT", payload: { id: id, data: receptData } });
  }

  async function zmazatRecept(id) {
    await odstranRecept(id);
    dispatch({ type: "ZMAZAT", payload: id });
  }

  const value = {
    recepty: receptyStav,
    nacitavaSa: nacitavaSa,
    chyba: chyba,
    nacitatRecepty: nacitatRecepty,
    pridatRecept: pridatRecept,
    upravitRecept: upravitRecept,
    zmazatRecept: zmazatRecept,
  };

  return (
    <ReceptyContext.Provider value={value}>{children}</ReceptyContext.Provider>
  );
}
