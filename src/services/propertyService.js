import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.js';

export const getProperties = async (category, type, rooms = null) => {
  console.log(`🔍 [START] Инициализация запроса к Firestore...`);
  console.log(`📡 Запрашиваемые параметры: category=${category}, type=${type}, rooms=${rooms}`);

  try {
    if (!category || !type) {
      console.error("⚠️ Ошибка: Category и Type обязательны!");
      throw new Error('Category and type are required');
    }

    const collectionPath = `properties/${category}/${type}`;
    console.log(`📁 Доступ к коллекции: ${collectionPath}`);

    const constraints = [];
    if (rooms) {
      constraints.push(where('rooms.all', '==', Number(rooms)));
      console.log(`🏠 Фильтр по количеству комнат: ${rooms}`);
    }

    const q = query(collection(db, collectionPath), ...constraints);
    console.log("🚀 Отправка запроса в Firestore...");

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn(`⚠️ Нет данных в Firestore для ${category} -> ${type} (rooms: ${rooms})`);
      return [];
    }

    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`✅ Найдено ${properties.length} объектов недвижимости`);
    return properties;
  } catch (error) {
    console.error("❌ Ошибка при получении данных из Firestore:", error);
    throw error;
  } finally {
    console.log("🔚 [END] Запрос завершен");
  }
};


const getSubcollectionDocs = async (parentDocPath) => {
  try {
    const subcollectionRef = collection(db, parentDocPath);
    const querySnapshot = await getDocs(subcollectionRef);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Ошибка при получении документов:", error);
  }
};

getSubcollectionDocs("properties").then(console.log);



