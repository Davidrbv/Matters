/* Definición propiedades facturas */
export class Invoice {
  invoiceId: string;
  codigo: string;
  fecha: Date;
  cantidad: number;
  proveedor: string;
  estado: boolean;
}
