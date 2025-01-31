import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AIService, ChatMessage, ChatResponse } from './ai.service';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService extends AIService {
  private apiKey: string = '';
  private model: string = 'gpt-3.5-turbo';
  private apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  chat(messages: ChatMessage[]): Observable<ChatResponse> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const requestBody = {
      model: this.model,
      messages: messages,
      temperature: 0.7
    };

    return from(fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    })).pipe(
      map(async (response) => {
        const data = await response.json();
        return {
          message: {
            role: 'assistant',
            content: data.choices[0].message.content
          },
          usage: data.usage
        };
      })
    );
  }

  getModelName(): string {
    return this.model;
  }

  isConfigured(): boolean {
    return this.apiKey !== '';
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  setModel(model: string): void {
    this.model = model;
  }
}