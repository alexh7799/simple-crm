import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDatepickerModule, MatProgressBarModule, MatTableModule ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  private firestore = inject(Firestore);
  user = new User();
  birthDate: Date;
  loading= false;

  constructor() {
    this.birthDate = new Date();
  }

  ngOnInit(): void {
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, { ...this.user }).then(() => {
      this.dialogRef.close();
      this.loading = false;
    });
  }
}
