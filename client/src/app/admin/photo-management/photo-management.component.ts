import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/_models/photo';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.photos = photos
    })
  }

  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: _ => {
        this.photos.splice(this.photos.findIndex(p=>p.id===photoId),1);
        this.toastr.info('Photo approved')
      },
      error: _ => { this.toastr.error('Error approving photo') }
    })
  }
  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: _ => {
        this.photos.splice(this.photos.findIndex(p=>p.id===photoId),1);
        this.toastr.info('Photo rejected')
      },
      error: _ => { this.toastr.error('Error rejecting photo') }
    })
  }

}
