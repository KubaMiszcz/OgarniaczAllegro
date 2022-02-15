import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DateYMDPipe } from './shared/pipes/date-YMD.pipe';
import { PlnPipe } from './shared/pipes/pln.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { OrderRowComponent } from './order-row/order-row.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { FooterComponent } from './core/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TriStateCheckBoxComponent } from './shared/tri-state-check-box/tri-state-check-box.component';
import { HttpClientModule } from '@angular/common/http';
import { ImportOrderComponent } from './import-all-orders/import-all-orders.component';
import { OrderDetailsModalComponent } from './order-details-modal/order-details-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    OrderRowComponent,
    OrdersTableComponent,
    FooterComponent,
    PlnPipe,
    DateYMDPipe,
    TriStateCheckBoxComponent,
    ImportOrderComponent,
    OrderDetailsModalComponent,
    SpinnerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
