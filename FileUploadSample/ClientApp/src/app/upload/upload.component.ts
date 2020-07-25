import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload.component.html'
})

export class UploadComponent {

  public progress: number;
  public message: string;
  constructor(private http: HttpClient) { }

  upload(files) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }
    this.progress = 0;
    this.message = '';
    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
     
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response)
        this.message = event.body['message']; 
    });
  }
}
