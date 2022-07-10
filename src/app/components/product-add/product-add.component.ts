import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup;

  constructor(private productService: ProductService,
     private fb: FormBuilder,
     private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      available: [false, Validators.required],
    });
  }

  onSaveProduct(){
    if(this.productFormGroup.invalid) return;
    this.productService.saveProduct(this.productFormGroup?.value)
    .subscribe(data => {
      this.router.navigateByUrl("/products");
    })
  }
}
