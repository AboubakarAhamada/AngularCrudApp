import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product?: IProduct 
  productId: number;
  constructor(private productService: ProductService, activateRoute : ActivatedRoute) { 
    this.productId = activateRoute.snapshot.params["id"];

  }

  ngOnInit(): void {
    this.onGetProductById();
  }

  onGetProductById(){
    this.productService.getProductById(this.productId)
    .subscribe({
      next: (data) => {
        console.log(data);
       this.product = data;
      }
    })
  }

}
