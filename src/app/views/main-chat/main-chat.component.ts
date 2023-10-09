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

  // Properties to store selected group and room names
  selectedGroup: string = '';
  selectedRoom: string = '';

  constructor(private socketioService: SocketioService) {}

  ngOnInit(): void {
    this.socketioService.getMessages().subscribe((message: string) => {
      console.log('Received message:', message);
      this.messages.push(message);
    });

  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.socketioService.sendMessage(this.message);
      this.message = '';
    }
  }

  // Create a new chat instance when a group or room is selected
  createChat(selectedGroup: string, selectedRoom: string): void {
    this.selectedGroup = selectedGroup;
    this.selectedRoom = selectedRoom;
    this.messages = []; // Clear the chat messages
  }
}
