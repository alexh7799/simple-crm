import { Firestore, collection, getDocs, doc, onSnapshot } from '@angular/fire/firestore';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, CommonModule, MatButtonModule, MatTooltipModule, MatCardModule, MatTableModule, DatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  firestore = inject(Firestore);
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'street', 'zipCode', 'city'];
  dataSource: User[] = [];
  dataUnsubscribe: (() => void) | null = null;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const usersCollection = collection(this.firestore, 'users');
    this.dataUnsubscribe = onSnapshot(usersCollection, (snapshot) => {
      this.dataSource = snapshot.docs.map(doc => {
        const data = doc.data();
        const user: any = [];
        user.id = doc.id;
        user.firstName = data['firstName'];
        user.lastName = data['lastName'];
        user.birthDate = new Date(data['birthDate']).toLocaleDateString('en-US');
        user.street = data['street'];
        user.zipCode = data['zipCode'];
        user.city = data['city'];
        return user;
      });
    });
  }

  ngOnDestroy() {
    if (this.dataUnsubscribe) {
      this.dataUnsubscribe();
    }
  }

  openAddDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  onRowClick(row: any) {
    console.log('Clicked row:', row.id);
  }
}
