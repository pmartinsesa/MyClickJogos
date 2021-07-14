import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'death-modal',
  templateUrl: './death-modal.component.html',
  styleUrls: ['./death-modal.component.css']
})
export class DeathModalComponent implements OnInit {
  private deadSubscription!: Subscription;
  private modalSubscription!: Subscription;

  @ViewChild('template', { read: TemplateRef }) template!:TemplateRef<any>;
  @Input() isDeadEvent!: Observable<boolean>;

  public modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public closeModal() {
    this.modalRef.hide();
    window.location.reload();
  }

  ngOnInit() {
    this.modalSubscription = this.modalService.onHide.subscribe(() => this.closeModal());
    this.deadSubscription = this.isDeadEvent.subscribe(() => this.openModal(this.template));
  }
}
