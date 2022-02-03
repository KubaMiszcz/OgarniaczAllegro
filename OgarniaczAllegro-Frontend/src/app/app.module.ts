import { PlnPipe } from './pipes/pln.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderRowComponent } from './order-row/order-row.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    OrderRowComponent,
    OrdersTableComponent,
    FooterComponent,
    PlnPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
