import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "booking",
    loadChildren: () => import("./booking/booking.module").then((m) => m.BookingModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user-profile/user-profile.module").then((m) => m.UserProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
