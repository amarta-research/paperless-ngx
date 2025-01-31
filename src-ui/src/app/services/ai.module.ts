import { NgModule } from '@angular/core';
import { AIService } from './ai.service';
import { MockAIService } from './mock-ai.service';

@NgModule({
  providers: [
    // Use MockAIService as the default implementation
    { provide: AIService, useClass: MockAIService }
  ]
})
export class AIModule {}