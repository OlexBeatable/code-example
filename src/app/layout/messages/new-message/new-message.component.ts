import {Component, EventEmitter, Output} from '@angular/core';
import {MessagesService} from '../../../shared/services/messages.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent{
  @Output()
  onMessageAdded = new EventEmitter;

  constructor(private messageService: MessagesService, private notifierService: NotifierService) { }

  submit(value) {
      this.messageService.putEntity(value).subscribe(res => {
          this.notifierService.notify('success', 'Message send');
          this.onMessageAdded.emit(res);
      }, e => {
          this.notifierService.notify('error', e.error.message || 'Something went wrong');
      });
  }
}
