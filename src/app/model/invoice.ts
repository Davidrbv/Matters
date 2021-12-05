/* Definición propiedades facturas */
export class Invoice {
  id: number;
  codigo: string;
  fecha: Date;
  cantidad: number;
  proveedor: string;
  estado: boolean;
}
