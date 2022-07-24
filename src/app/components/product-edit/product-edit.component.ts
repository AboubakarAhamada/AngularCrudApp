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
  submitted: boolean = false;

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
        name : [product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        price: [product.price, [Validators.required, Validators.min(5)]],
        quantity: [product.quantity, [Validators.required,Validators.min(1)]],
        available: [product.available, Validators.required],
     })
   })
  }

  onUpdateProduct(){
    this.submitted =true;
    if(this.productFormGroup.invalid) return
    this.productService.updateProduct(this.productFormGroup.value)
    .subscribe(product => {
      this.router.navigateByUrl("/products");
    })
  }

}
