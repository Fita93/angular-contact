import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AddContactFormComponent,
  ViewContactFormEnum,
} from './components/add-contact-form/add-contact-form.component';
import { defaultDialogConfig } from './models/constants';
import { ImportExportCSVService } from './services/import-export-csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'contact-app';
  fileName = '';

  constructor(
    public dialog: MatDialog,
    private csvService: ImportExportCSVService
  ) {}

  openNewContact(): void {
    this.dialog.open(AddContactFormComponent, {
      data: { view: ViewContactFormEnum.NEW },
      ...defaultDialogConfig,
    });
  }

  exportToCSV() {
    this.csvService.exportToCSV();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.fileName = file.name;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.csvService.importCSV(csv)
      };
    }
  }
}
