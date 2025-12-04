import { Component, OnInit, inject, signal } from '@angular/core';
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
  fullNameEdit: string = '';
  emailEdit: string = '';
  profilePhotoUrl: string | null = null;
  selectedFile: File | null = null;

  isEditing = signal(false);

  imageUploadService = inject(UploadService);
  userService = inject(UsersignupService);

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    this.userService.getUserById().subscribe({
      next: (res) => {
        (this.fullName = res.fullName),
          (this.fullNameEdit = this.fullName),
          (this.email = res.email),
          (this.emailEdit = this.email),
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
      this.isUploadingPhoto.set(true);
      this.saveChanges();
    }
  }

  isUploadingPhoto = signal(false);
  async saveChanges() {
    let uploadedUrl = this.profilePhotoUrl;

    if (this.selectedFile) {
      const response = await firstValueFrom(
        this.imageUploadService.uploadImage(this.selectedFile)
      );

      uploadedUrl = response.imageUrl;
    }

    if(this.fullName === this.fullNameEdit && this.email === this.emailEdit){
      this.isEditing.set(false)
      return
    }

    let userData = {
      fullName: this.fullNameEdit,
      email: this.emailEdit,
      image: uploadedUrl!,
    };

    this.userService.updateUser(userData).subscribe({
      next: (res) => {
        this.isUploadingPhoto.set(false);
        this.loadUserData()
        if(this.isEditing())
          this.isEditing.set(false)
        this.selectedFile = null;
        console.log(res);
      },
      error: (err) => {
        this.isUploadingPhoto.set(true);
        console.log(err);
      },
    });
  }
}
