import { get, ref, remove, set, update } from 'firebase/database';
import { AddProduct, Product } from '../pages/AddProducts';
import { firebaseDb } from '../service/firebase/init';
import uuid from 'react-uuid';
import { CartItem, UpdateItem } from '../hooks/cart';

export async function addNewProduct(prouduct: AddProduct, image: string) {
  const id = uuid();
  return set(ref(firebaseDb, `products/${id}`), {
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

export async function getProductById(id: string): Promise<Product> {
  return get(ref(firebaseDb, `products/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    }
  });
}

export async function getCartByUser(id: string): Promise<CartItem[]> {
  return get(ref(firebaseDb, `cart/${id}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const items: CartItem[] = Object.values(data);
      return items;
    } else return [];
  });
}

export async function addToCart(item: UpdateItem) {
  const { uid, ...product } = item;
  set(ref(firebaseDb, `cart/${uid}/${product.id}_${product.option}`), product);
}

export async function deleteCartItem(item: UpdateItem) {
  remove(ref(firebaseDb, `cart/${item.uid}/${item.id}_${item.option}`));
}

export async function changeCount(item: UpdateItem) {
  const { uid, ...product } = item;
  const path = `cart/${uid}/${product.id}_${product.option}`;
  update(ref(firebaseDb), { [path]: product });
}
