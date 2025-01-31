import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { AIService, ChatMessage, ChatResponse } from './ai.service';

@Injectable({
  providedIn: 'root'
})
export class MockAIService extends AIService {
  private readonly mockResponses = [
    'I understand you\'re asking about this document. How can I help you analyze it?',
    'Based on the document content, I can provide more specific information if you have any particular questions.',
    'I\'m here to help you understand the document better. What would you like to know?'
  ];

  private responseIndex = 0;

  chat(messages: ChatMessage[]): Observable<ChatResponse> {
    const response: ChatResponse = {
      message: {
        role: 'assistant',
        content: this.mockResponses[this.responseIndex % this.mockResponses.length]
      },
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30
      }
    };

    this.responseIndex++;
    
    // Simulate network delay
    return of(response).pipe(delay(1000));
  }

  getModelName(): string {
    return 'Mock AI Model';
  }

  isConfigured(): boolean {
    return true;
  }
}