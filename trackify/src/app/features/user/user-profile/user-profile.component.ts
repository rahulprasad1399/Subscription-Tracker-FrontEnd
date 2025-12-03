import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  fullName: string = 'Rahul Prasad';
  email: string = 'rahul@example.com';
  profilePhotoUrl: string | null = null;
  selectedFile : File | null = null;

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.profilePhotoUrl = URL.createObjectURL(file);
    }
  }

  saveChanges() {
    console.log(this.fullName)
    console.log(this.email)
    console.log(this.profilePhotoUrl)
  }
}
