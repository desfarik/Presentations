import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import {ViewComponent} from './pages/view/view.component';
import {CreateComponent} from './pages/create/create.component';
import {MainComponent} from './pages/main/main.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TaskPanelComponent} from './components/task-panel/task-panel.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CardListComponent} from './components/card-list/card-list.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TaskEditorDialogComponent} from './pages/create/task-editor-dialog/task-editor-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {firebaseConfig} from "../../firebase.config";
import {AngularFireAuthModule, USE_EMULATOR} from "@angular/fire/auth";
import {FirebaseUIModule} from "firebaseui-angular";
import {firebaseUiAuthConfig} from "../../login.config";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    CreateComponent,
    MainComponent,
    TaskPanelComponent,
    CardListComponent,
    TaskEditorDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EditorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
