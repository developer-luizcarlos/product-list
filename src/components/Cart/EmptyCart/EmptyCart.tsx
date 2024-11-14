/* eslint-disable @next/next/no-img-element */
export default function EmptyCart() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <img src="./assets/images/illustration-empty-cart.svg" alt="icon your cart is empty" />
      <p className="text-sm text-rose-500 font-bold">Your added items will appear here</p>
    </div>
  );
}