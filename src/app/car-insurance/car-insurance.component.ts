import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CarInsuranceService } from './services/car-insurance.service';
import { Observable } from 'rxjs';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent implements OnInit{
  insuranceData:any;
  window:any ;
  totalPremiumReceived!:Observable<Number>;
  progress = 20;

  get nativeWindow(){
    return _window();
  }

  constructor(public router:Router,private carInsSVC:CarInsuranceService){
    this.insuranceData=this.carInsSVC.carInsuranceModal;
  }

  ngOnInit() {
   
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateProgress();
      }
    });
    this.totalPremiumReceived = this.carInsSVC.totalPremiumObs$;
  }

  

  options = {
    "key": "rzp_test_qSq0bbE7RM7GtV", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

payNow(){


  var rzp1 = new this.nativeWindow.Razorpay(this.options);
  rzp1.open();
}

updateProgress() {
  const currentRoute = this.router.routerState.snapshot.url;
  const routes = [
    '/car-insurance',
    //'/car-insurance/select-brand',
    '/car-insurance/choose-plan',
    //'/car-insurance/registration-details',
    '/car-insurance/personal-details',
    '/car-insurance/payment'
  ];
  this.progress = (routes.indexOf(currentRoute) / (routes.length - 1)) * 100;
}
}



// Download details for future reference.

// Key ID
// rzp_test_qSq0bbE7RM7GtV
// Key Secret
// GdvQ062sKQZn58hXomU3ueE4
