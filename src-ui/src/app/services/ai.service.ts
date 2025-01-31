import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: ChatMessage;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  sendMessage(documentId: number, message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/api/documents/${documentId}/chat/`, {
      message
    });
  }

  getConversationHistory(documentId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/api/documents/${documentId}/chat/history/`);
  }
}