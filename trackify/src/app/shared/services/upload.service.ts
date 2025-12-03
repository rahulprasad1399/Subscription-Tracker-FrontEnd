import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  http = inject(HttpClient);

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(
      `${environment.apiUrl}/Image/Upload`,
      formData
    );
  }
}
