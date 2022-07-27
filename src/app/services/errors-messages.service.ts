import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsMessagesService {

  private fieldRequiredMessage: String = "This field can't be empty.";
  private productNameErrorMessage : String = "Product name must have between 3 and 50 characters.";
  private priceErrorMessage : String = "You cant't set price less than 5 DH."
  private quantitErrorMessage : String = "Quantity must be positive integer"

  constructor() { }

  getFiledRequiredMessage (): String{
    return this.fieldRequiredMessage;
  }

  getProductNameErrorMessage(): String {
    return this.productNameErrorMessage;
  }

  getPriceErrorMessage(): String{
    return this.priceErrorMessage;
  }

  getQuantityErrorMessage(): String{
    return this.quantitErrorMessage;
  }
}
