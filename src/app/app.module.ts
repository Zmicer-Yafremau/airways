import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import AppRoutingModule from "./app-routing.module";
import { RegisterComponent } from "./modules/auth/components/register/register/register.component";


@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
