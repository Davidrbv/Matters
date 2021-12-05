/* Definición propiedades de las ventas */
export class Sale {
  id: number;
  fecha: Date;
  efectivo?: number;
  tarjeta?: number;
  total: number;
}
