"use client";

import { useEffect,useState } from "react";
import Container from "@/components/Container/Container";
import Card from "@/components/Card/Card";
import Cart from "@/components/Cart/Cart";
import { StaticImageData } from "next/image";

type ProductsType = {
  id: number;
  image: { desktop: StaticImageData; };
  name: string;
  category: string;
  price: string;
};

export default function Home() {
  const [products,setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        const data = await response.json();
        setProducts(data);
      } catch(error) {
        console.log("Error",error);
      }
    };

    fetchData();
  },[]);


  return (
    <div className="w-full h-full">
      <Container>
        <main className="grid-templeate gap-9">
          <section className="w-100%">
            <h1 className="text-4xl font-bold mb-5">Desserts</h1>
            <div className="columns-3 gap-0">
              {products.map((product) => {
                return <Card
                  key={product.name}
                  id={product.id}
                  image={(product.image.desktop).toString()}
                  name={product.name}
                  category={product.category}
                  price={Number(product.price)}
                />;
              })}
            </div>
          </section>
          <aside>
            <Cart />
          </aside>
        </main>
      </Container>
    </div>
  );
}