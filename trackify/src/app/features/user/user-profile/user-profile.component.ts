import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../shared/services/upload.service';
import { firstValueFrom } from 'rxjs';

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

  imageUploadService = inject(UploadService)

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.profilePhotoUrl = URL.createObjectURL(file);
    }
  }

  async saveChanges() {
    let uploadedUrl = this.profilePhotoUrl;
  
    if (this.selectedFile) {
      const response = await firstValueFrom(
        this.imageUploadService.uploadImage(this.selectedFile)
      );
  
      uploadedUrl = response.imageUrl;
      console.log("Uploaded URL:", uploadedUrl);
    }
  
    // Now call your Update User API using uploadedUrl  
    // this.userService.updateProfile({ fullName: this.fullName, email: this.email, photo: uploadedUrl });
  }
}
