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
  messages: string[] = [];

  constructor(private socketioService: SocketioService) {}

  ngOnInit(): void {
    this.socketioService.getMessages().subscribe((message: string) => {
      console.log('Received message:', message);
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.socketioService.sendMessage(this.message);
      this.message = '';
    }
  }

  private scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}
