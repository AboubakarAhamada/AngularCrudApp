import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorsMessagesService } from 'src/app/services/errors-messages.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup;
  submitted: boolean = false;
  fieldRequiredMessage? : String;
  productNameErrorMessage?: String;
  priceErrorMessage ?: String;
  quantityErrorMessage?: String;

  constructor(private productService: ProductService,
     private errMsgService: ErrorsMessagesService,
     private fb: FormBuilder,
     private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(5)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      available: [false, Validators.required],
    });

    this.fieldRequiredMessage = this.errMsgService.getFiledRequiredMessage();
    this.fieldRequiredMessage = this.errMsgService.getFiledRequiredMessage();
     this.productNameErrorMessage = this.errMsgService.getProductNameErrorMessage();
     this.priceErrorMessage = this.errMsgService.getPriceErrorMessage();
     this.quantityErrorMessage = this.errMsgService.getQuantityErrorMessage();

  }

  onSaveProduct(){
    this.submitted = true;
    console.log(this.productFormGroup)
    if(this.productFormGroup.invalid) return;
    this.productService.saveProduct(this.productFormGroup?.value)
    .subscribe(data => {
      this.router.navigateByUrl("/products");
    })
  }
}
