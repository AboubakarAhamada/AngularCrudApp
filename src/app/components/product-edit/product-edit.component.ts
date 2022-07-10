import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup!: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
     private productService: ProductService,
     private router: Router,
     private fb: FormBuilder)
      {
    this.productId = activateRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.productService.getProductById(this.productId)
    .subscribe(product => {
      this.productFormGroup = this.fb.group({
        id : [product.id, Validators.required],
        name : [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        available: [product.available, Validators.required],
     })
   })
  }

  onUpdateProduct(){
    if(this.productFormGroup.invalid) return
    this.productService.updateProduct(this.productFormGroup.value)
    .subscribe(product => {
      this.router.navigateByUrl("/products");
    })
  }

}
