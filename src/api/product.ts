import { get, ref, set } from 'firebase/database';
import { AddProduct, Product } from '../pages/AddProducts';
import { firebaseDb } from '../service/firebase/init';
import uuid from 'react-uuid';

export async function addNewProduct(prouduct: AddProduct, image: string) {
  const id = uuid();
  set(ref(firebaseDb, `products/${id}`), {
    ...prouduct,
    id,
    image,
    price: parseInt(prouduct.price),
    options: prouduct.options.split(','),
  });
}

export async function getAllProducts(): Promise<Product[] | undefined> {
  return get(ref(firebaseDb, 'products/')).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    }
  });
}
export async function getProductsByCategory(
  category: string
): Promise<Product[] | undefined> {
  return get(ref(firebaseDb, 'products/')).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const products: Product[] = Object.values(data);
      return products.filter(
        (product) => product.category === category.toLocaleUpperCase()
      );
    }
  });
}
