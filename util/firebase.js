const FIREBASE_URL =
  "https://recepty-7c46d-default-rtdb.europe-west1.firebasedatabase.app";
const RECEPTY_URL = `${FIREBASE_URL}/recepty`;

async function overOdpoved(response) {
  if (!response.ok) {
    throw new Error("Komunikacia s Firebase zlyhala.");
  }

  return response.json();
}

export async function nacitajRecepty() {
  const response = await fetch(`${RECEPTY_URL}.json`);
  const data = await overOdpoved(response);

  if (!data) {
    return [];
  }

  const recepty = [];

  for (const id in data) {
    recepty.push({
      id,
      nazov: data[id].nazov,
      cas: data[id].cas,
      kategoria: data[id].kategoria,
      suroviny: data[id].suroviny,
      postup: data[id].postup,
      oblubeny: data[id].oblubeny,
      createdAt: data[id].createdAt,
    });
  }

  return recepty.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export async function ulozRecept(receptData) {
  const dataNaUlozenie = {
    ...receptData,
    createdAt: Date.now(),
  };

  const response = await fetch(`${RECEPTY_URL}.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataNaUlozenie),
  });
  const data = await overOdpoved(response);

  return {
    ...dataNaUlozenie,
    id: data.name,
  };
}

export async function aktualizujRecept(id, receptData) {
  const response = await fetch(`${RECEPTY_URL}/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receptData),
  });

  await overOdpoved(response);
}

export async function odstranRecept(id) {
  const response = await fetch(`${RECEPTY_URL}/${id}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Recept sa nepodarilo zmazat.");
  }
}
