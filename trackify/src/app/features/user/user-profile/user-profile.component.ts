import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../shared/services/upload.service';
import { firstValueFrom } from 'rxjs';
import { UsersignupService } from '../../../shared/services/userAuth.service';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  profilePhotoUrl: string | null = null;
  selectedFile: File | null = null;

  imageUploadService = inject(UploadService);
  userService = inject(UsersignupService);

  ngOnInit(): void {
    this.userService.getUserById().subscribe({
      next: (res) => {
        (this.fullName = res.fullName),
          (this.email = res.email),
          (this.profilePhotoUrl = res.image);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
    }

    let userData = {
      fullName: this.fullName,
      email: this.email,
      image: uploadedUrl!,
    };

    console.log(userData);

    this.userService.updateUser(userData).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
