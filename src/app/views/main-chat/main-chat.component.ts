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
  selectedFile: File | null = null;

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

  sendMessage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Send the file-upload text along with the file to the server
      this.socketioService.sendMessageWithFile(this.message, formData, this.selectedRoom);
      console.log('Sending file-upload: ', this.message, this.selectedRoom, this.selectedFile)
      // Reset the selectedFile
      this.selectedFile = null;
    } else {
      // Handle text-only file-upload sending
      this.socketioService.sendMessage(this.message, this.selectedRoom);
    }
    this.message = '';
  }

  filterChatMessages(): any[] {
    return this.messages.filter((message) => {
      return message.room === this.selectedRoom;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
