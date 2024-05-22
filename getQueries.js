import { MongoClient } from 'mongodb';

const URL_DB = 'mongodb://localhost:27015';
const DB_NAME = 'Restaurants';

export async function executeQuery(queryFunction) {
  const client = new MongoClient(URL_DB);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    return await queryFunction(db);
  } catch (err) {
    console.log('Some error', err);
  } finally {
    await client.close();
  }
}

// 1. Escribe una consulta para mostrar todos los documentos en la colección Restaurantes.
export async function query_1(db) {
  const results = await db.collection('Data').find({}).toArray();
  console.log(results);
}

// 2. Escribe una consulta para mostrar el restaurante_id, name, borough y cuisine de todos los documentos en la colección Restaurantes.
export async function query_2(db) {
  const results = await db
    .collection('Data')
    .find(
      {},
      { projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } }
    )
    .toArray();
  console.log(results);
}

// 3. Escribe una consulta para mostrar el restaurante_id, name, borough y cuisine, pero excluyendo el campo _id por todos los documentos en la colección Restaurantes.
export async function query_3(db) {
  const results = await db
    .collection('Data')
    .find(
      {},
      {
        projection: {
          _id: 0,
          restaurant_id: 1,
          name: 1,
          borough: 1,
          cuisine: 1,
        },
      }
    )
    .toArray();
  console.log(results);
}

// 4. Escribe una consulta para mostrar restaurant_id, name, borough y zip code, pero excluyendo el campo _id por todos los documentos en la colección Restaurantes.
export async function query_4(db) {
  const results = await db
    .collection('Data')
    .find(
      {},
      {
        projection: {
          _id: 0,
          restaurant_id: 1,
          name: 1,
          borough: 1,
          'address.zipcode': 1,
        },
      }
    )
    .toArray();
  console.log(results);
}

// 5. Escribe una consulta para mostrar todos los restaurantes que están en el Bronx.
export async function query_5(db) {
  const results = await db
    .collection('Data')
    .find({ borough: 'Bronx' })
    .toArray();
  console.log(results);
}

// 6.  Escribe una consulta para mostrar los primeros 5 restaurantes que están en el Bronx.
export async function query_6(db) {
  const results = await db
    .collection('Data')
    .find({ borough: 'Bronx' })
    .limit(5)
    .toArray();
  console.log(results);
}

// 7. Escribe una consulta para mostrar los 5 restaurantes después de saltar los primeros 5 que sean del Bronx.
export async function query_7(db) {
  const results = await db
    .collection('Data')
    .find({ borough: 'Bronx' })
    .skip(5)
    .limit(5)
    .toArray();
  console.log(results);
}
// 8. Escribe una consulta para encontrar los restaurantes que tienen algún resultado mayor de 90.
export async function query_8(db) {
  const results = await db
    .collection('Data')
    .find({ 'grades.score': { $gt: 90 } })
    .toArray();
  console.log(results);
}

// 9. Escribe una consulta para encontrar los restaurantes que tienen un resultado mayor que 80 pero menos que 100.
export async function query_9(db) {
  const results = await db
    .collection('Data')
    .find({ 'grades.score': { $gt: 80, $lt: 100 } })
    .toArray();
  console.log(results);
}

// 10. Escribe una consulta para encontrar los restaurantes situados en una longitud inferior a -95.754168.
export async function query_10(db) {
  const results = await db
    .collection('Data')
    .find({ 'address.coord.0': { $lt: -95.754168 } })
    .toArray();
  console.log(results);
}

// 11. Consulta para encontrar restaurantes que no cocinan comida "American", con score superior a 70 y longitud inferior a -65.754168.
export async function query_11(db) {
  const results = await db
    .collection('Data')
    .find({
      $and: [
        { cuisine: { $ne: 'American' } },
        { 'grades.score': { $gt: 70 } },
        { 'address.coord.0': { $lt: -65.754168 } },
      ],
    })
    .toArray();
  console.log(results);
}

// 12. Escribe una consulta para encontrar los restaurantes que no preparan comida 'American' y tienen algún resultado superior a 70 y que, además, se localizan en longitudes inferiores a -65.754168.
export async function query_12(db) {
  const results = await db
    .collection('Data')
    .find({
      cuisine: { $ne: 'American' },
      'grades.score': { $gt: 70 },
      'address.coord.0': { $lt: -65.754168 },
    })
    .toArray();
  console.log(results);
}

// 13. Escribe una consulta para encontrar los restaurantes que no preparan comida 'American ', tienen alguna nota 'A' y no pertenecen a Brooklyn.
export async function query_13(db) {
  const results = await db
    .collection('Data')
    .find({
      cuisine: { $ne: 'American' },
      'grades.grade': 'A',
      borough: { $ne: 'Brooklyn' },
    })
    .sort({ cuisine: -1 })
    .toArray();
  console.log(results);
}

// 14. Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'Wil' en las tres primeras letras en su nombre.
export async function query_14(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        name: { $regex: /^Wil/ },
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}
// 15. Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'ces' en las últimas tres letras en su nombre.
export async function query_15(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        name: { $regex: /ces$/ },
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 16.1 Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que contienen 'Reg' en cualquier lugar de su nombre.
export async function query_16(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        name: { $regex: /Reg/ },
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 17. Escribe una consulta para encontrar los restaurantes que pertenecen al Bronx y preparan platos americanos o chinos.
export async function query_17(db) {
  const results = await db
    .collection('Data')
    .find({
      borough: 'Bronx',
      $or: [{ cuisine: 'American' }, { cuisine: 'Chinese' }],
    })
    .toArray();
  console.log(results);
}

// 18. Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que pertenecen a Staten Island, Queens, Bronx o Brooklyn.
export async function query_18(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        $or: [
          { borough: 'Staten Island' },
          { borough: 'Queens' },
          { borough: 'Bronx' },
          { borough: 'Brooklyn' },
        ],
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 19. Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que NO pertenecen a Staten Island, Queens, Bronx o Brooklyn.
export async function query_19(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] },
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 20.  Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que consigan una nota menor que 10.
export async function query_20(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        'grades.score': { $lt: 10 },
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 21. Escribe una consulta para encontrar el restaurante_id, name, borough y cuisine para aquellos restaurantes que preparan marisco ('seafood') excepto si son 'American ', 'Chinese' ; o el name del restaurante comienza con letras 'Wil'.
export async function query_21(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        $and: [
          { cuisine: 'Seafood' },
          { cuisine: { $nin: ['American ', 'Chinese'] } },
          { name: { $not: /^Wil/ } },
        ],
      },
      {
        projection: { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 22. Escribe una consulta para encontrar el restaurante_id, name y gradas para aquellos restaurantes que consigan un grade de "A" y un resultado de 11 con un ISODate "2014-08-11T00:00:00Z".
export async function query_22(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        grades: {
          $elemMatch: {
            grade: 'A',
            score: 11,
            date: new Date('2014-08-11T00:00:00Z'),
          },
        },
      },
      {
        projection: { restaurant_id: 1, name: 1, grades: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 23. Escribe una consulta para encontrar el restaurante_id, name y gradas para aquellos restaurantes donde el 2º elemento del array de grados contiene un grade de "A" y un resultado 9 con un ISODate "2014-08-11T00:00:00Z".
export async function query_23(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        'grades.1.grade': 'A',
        'grades.1.score': 9,
        'grades.1.date': new Date('2014-08-11T00:00:00Z'),
      },
      {
        projection: { restaurant_id: 1, name: 1, grades: 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 24. Escribe una consulta para encontrar el restaurante_id, name, dirección y ubicación geográfica para aquellos restaurantes donde el segundo elemento del array coord contiene un valor entre 42 y 52.
export async function query_24(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        'address.coord.1': { $gte: 42, $lte: 52 },
      },
      {
        projection: { restaurant_id: 1, name: 1, address: 1 },
      }
    )
    .toArray();
  console.log(results);
}
// 25. Escribe una consulta para organizar los restaurantes por nombre en orden ascendente.
export async function query_25(db) {
  const results = await db
    .collection('Data')
    .find({})
    .sort({ name: 1 })
    .toArray();
  console.log(results);
}

// 26. Escribe una consulta para organizar los restaurantes por nombre en orden descendente.
export async function query_26(db) {
  const results = await db
    .collection('Data')
    .find({})
    .sort({ name: -1 })
    .toArray();
  console.log(results);
}

// 27. Escribe una consulta para organizar los restaurantes por el nombre de la cuisine en orden ascendente y por el barrio en orden descendente.
export async function query_27(db) {
  const results = await db
    .collection('Data')
    .find({})
    .sort({ cuisine: 1, borough: -1 })
    .toArray();
  console.log(results);
}

// 28. Escribe una consulta para saber si las direcciones contienen la calle.
export async function query_28(db) {
  const results = await db
    .collection('Data')
    .find({ 'address.street': { $exists: true } })
    .toArray();
  console.log(results);
}

// 29. Escribe una consulta que seleccione todos los documentos en la colección de restaurantes donde los valores del campo coord es de tipo Double.
export async function query_29(db) {
  const results = await db
    .collection('Data')
    .find({ 'address.coord': { $type: 'double' } })
    .toArray();
  console.log(results);
}

// 30. Escribe una consulta que seleccione el restaurante_id, name y grade para aquellos restaurantes que devuelven 0 como residuo después de dividir alguno de sus resultados por 7.
export async function query_30(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        'grades.score': { $mod: [7, 0] },
      },
      {
        projection: { restaurant_id: 1, name: 1, 'grades.grade': 1 },
      }
    )
    .toArray();
  console.log(results);
}

// 31. Escribe una consulta para encontrar el name de restaurante, borough, longitud, latitud y cuisine para aquellos restaurantes que contienen 'mon' en algún sitio de su name.
export async function query_31(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        name: { $regex: /mon/i },
      },
      {
        projection: { name: 1, borough: 1, 'address.coord': 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}
// 32. Escribe una consulta para encontrar el name de restaurante, borough, longitud, latitud y cuisine para aquellos restaurantes que contienen 'Mad' como primeras tres letras de su name.
export async function query_32(db) {
  const results = await db
    .collection('Data')
    .find(
      {
        name: { $regex: /^Mad/ },
      },
      {
        projection: { name: 1, borough: 1, 'address.coord': 1, cuisine: 1 },
      }
    )
    .toArray();
  console.log(results);
}
