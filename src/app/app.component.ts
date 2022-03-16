import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 file: File;

 handleFileInput(files: FileList) {
  this.file = files.item(0);
}

}
