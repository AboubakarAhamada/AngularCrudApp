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

  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products");
  }

  getSelectedProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products?selected=true");
  }

  getAvailableProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products?available=true");
  }

  searchProducts(keyword:string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.host+"/products?name_like="+keyword);
  }

  deleteProduct(product: IProduct): Observable<void> {
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }
}
