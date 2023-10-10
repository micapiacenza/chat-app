import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SocketioService } from '../../common/services/socket/socketio.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  message: string = '';
  messages: any[] = [];

  // Properties to store selected group and room names
  selectedGroup: string = '';
  selectedRoom: string = '';

  constructor(private socketioService: SocketioService) {}

  ngOnInit() {
    this.socketioService.getMessages().subscribe((messageData: any) => {
      console.log('Received message component:', messageData);
      this.messages.push(messageData);
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '' && this.selectedRoom) {
      this.socketioService.sendMessage(this.message, this.selectedRoom);
      this.message = '';
    }
  }

  filterChatMessages(): any[] {
    return this.messages.filter((message) => {
      return message.room === this.selectedRoom;
    });
  }
}
