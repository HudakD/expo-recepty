import { FlatList } from "react-native";
import PolozkaVydavok from "./PolozkaVydavok";

export default function ZoznamVydavkov({ vydavky }) {
  //console.log("Vydavky v PolozkaVYdavok:", vydavky);
  function zobrazVydavokPolozku(itemData) {
    return <PolozkaVydavok {...itemData.item} />;
  }

  return (
    <FlatList
      data={vydavky}
      renderItem={zobrazVydavokPolozku}
      keyExtractor={(item) => item.id}
    />
  );
}
