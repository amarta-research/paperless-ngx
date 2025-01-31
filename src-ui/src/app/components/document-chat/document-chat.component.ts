import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Document } from 'src/app/data/document';
import { AIService } from 'src/app/services/ai.service';


@Component({
  selector: 'app-document-chat',
  templateUrl: './document-chat.component.html',
  styleUrls: ['./document-chat.component.scss'],
  imports: [FormsModule],
  standalone: true
})
export class DocumentChatComponent implements OnInit {
  @Input() document: Document

  messages: Array<{role: 'user' | 'assistant', content: string}> = []
  loading: boolean = false
  userInput: string = ''

  constructor(private aiService: AIService) {}

  ngOnInit(): void {
    if (this.document) {
      this.loadChatHistory();
    }
  }

  private async loadChatHistory(): Promise<void> {
    try {
      const history = await this.aiService.getConversationHistory(this.document.id).toPromise();
      if (history) {
        this.messages = history;
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }

  async sendMessage() {
    if (!this.userInput.trim() || !this.document) return;

    const userMessage = this.userInput.trim();
    this.userInput = '';
    
    // Add user message to chat immediately for better UX
    this.messages.push({
      role: 'user',
      content: userMessage
    });

    this.loading = true;

    try {
      const response = await this.aiService.sendMessage(this.document.id, userMessage).toPromise();
      if (response?.message) {
        this.messages.push(response.message);
      }
      if (response?.error) {
        console.error('AI service error:', response.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show error to user
    } finally {
      this.loading = false;
    }
  }
}