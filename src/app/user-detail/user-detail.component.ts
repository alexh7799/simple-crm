import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

export class UserDetailComponent implements OnInit {
  firestore = inject(Firestore);
  user: any = {};
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const userId = params['id'];
        this.getUser(userId);
      })
    );
  }

  getUser(id: string) {
    const userDocRef = doc(this.firestore, 'users', id);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.user = {
          firstName: data['firstName'],
          lastName: data['lastName'],
          birthDate: data['birthDate'],
          street: data['street'],
          zipCode: data['zipCode'],
          city: data['city']
        };
      }
    });

    // Subscription zum Aufräumen hinzufügen
    this.subscriptions.add({
      unsubscribe: () => unsubscribe()
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
