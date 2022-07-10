import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  products$: Observable<IProduct[]>|null = null;
  ngOnInit(): void {
    this.onGetAllProducts()
  }

  onGetAllProducts() {
    this.products$= this.productService.getAllProducts();
  }

  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProducts();
  }

  onSearchProducts(dataForm:any){ // les données du formulaire
    this.products$ = this.productService.searchProducts(dataForm.keyword);
  }

  onDeleteProduct(product: IProduct){
    let confirmMessage = confirm("Etes-vous sur de vuloir supprimer le produit "+ product.name+ "?");
    if(confirmMessage) {
      this.productService.deleteProduct(product)
      .subscribe(data => {
      // On recharge les données
        this.onGetAllProducts();
      });
    }
  }

  onAddProduct(){
    this.router.navigateByUrl("/add-product");
  }

  onEditProduct(p: IProduct){
    this.router.navigateByUrl("editProduct/"+p.id);
  }

}
