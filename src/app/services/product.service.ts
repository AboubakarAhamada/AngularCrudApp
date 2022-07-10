import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host:string = environment.host;
  constructor(private http: HttpClient) { }

  getProductById(id: number):Observable<IProduct>{
    return this.http.get<IProduct>(this.host+"/products/"+id);
  }
  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products");
  }

  getAvailableProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products?available=true");
  }

  searchProducts(keyword:string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products?name_like="+keyword);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.host+"/products", product);
  }

  deleteProduct(product: IProduct): Observable<void> {
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }

  updateProduct(product: IProduct): Observable<void>{
    return this.http.put<void>(this.host+"/products/"+product.id, product);
  }

}
