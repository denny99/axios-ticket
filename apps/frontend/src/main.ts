import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppUiModule } from "./app/app.browser.module";

platformBrowserDynamic()
  .bootstrapModule(AppUiModule)
  .catch((err) => console.error(err));
