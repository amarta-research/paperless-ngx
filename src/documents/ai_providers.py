from abc import ABC, abstractmethod
from typing import List, Dict, Any
from django.conf import settings

class AIProvider(ABC):
    @abstractmethod
    async def process_message(self, document_content: str, message: str, conversation_history: List[Dict[str, str]] = None) -> str:
        pass

class OpenAIProvider(AIProvider):
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL

    async def process_message(self, document_content: str, message: str, conversation_history: List[Dict[str, str]] = None) -> str:
        # TODO: Implement OpenAI API integration
        # This is a placeholder implementation
        return f"This is a placeholder response for: {message}"

class AIProviderFactory:
    _providers: Dict[str, Any] = {
        'openai': OpenAIProvider,
        # Add more providers here
    }

    @classmethod
    def get_provider(cls, provider_name: str) -> AIProvider:
        provider_class = cls._providers.get(provider_name)
        if not provider_class:
            raise ValueError(f"Unknown AI provider: {provider_name}")
        return provider_class()

    @classmethod
    def register_provider(cls, name: str, provider_class: type):
        if not issubclass(provider_class, AIProvider):
            raise ValueError(f"{provider_class.__name__} must inherit from AIProvider")
        cls._providers[name] = provider_class