import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './modules/view/view.component';
import { CreateComponent } from './modules/create/create.component';
import { MainComponent } from './modules/main/main.component';
import { TaskPanelComponent } from './components/task-panel/task-panel.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { TaskEditorDialogComponent } from './modules/create/task-editor-dialog/task-editor-dialog.component';
import { LoginComponent } from './modules/login/login.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { SaveHtmlPipe } from './core/pipes/save-html.pipe';
import { firebaseConfig } from '../../firebase.config';
import { firebaseUiAuthConfig } from '../../login.config';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    CreateComponent,
    MainComponent,
    TaskPanelComponent,
    CardListComponent,
    TaskEditorDialogComponent,
    LoginComponent,
    DeleteDialogComponent,
    SaveHtmlPipe,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EditorModule,
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
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsSelectSnapshotModule.forRoot(),
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
