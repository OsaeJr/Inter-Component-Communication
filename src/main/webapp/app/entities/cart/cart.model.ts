export interface ICart {
  id?: string;
  name?: string | null;
  description?: string | null;
  price?: number | null;
}

export class Cart implements ICart {
  constructor(public id?: string, public name?: string | null, public description?: string | null, public price?: number | null) {}
}

export function getCartIdentifier(cart: ICart): string | undefined {
  return cart.id;
}
