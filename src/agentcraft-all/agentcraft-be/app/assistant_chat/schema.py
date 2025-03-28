"""Chat Schema"""
# pylint: disable = too-few-public-methods
from typing import List, Optional, Dict, Literal, Any, Union
from pydantic import BaseModel, Field, validator  # pylint: disable = no-name-in-module


class UpdateChatRequest(BaseModel):
    """修改回答记录"""
    chat_type: int

# class ExperimentalChatInner(BaseModel):
#     """Experimental Chat Inner Class"""
#     table: str
#     fields: int
#     day: int


# class ExperimentalChatRequest(BaseModel):
#     """Experimental Chat Class"""
#     role: str
#     sources: List[ExperimentalChatInner]
#     action: str

max_tokens_field = Field(
    default=16, ge=1, description="The maximum number of tokens to generate."
)

temperature_field = Field(
    default=0.8, ge=0.0, le=2.0, description="Adjust the randomness of the generated text.\n\n" +
    "Temperature is a hyperparameter that controls the randomness of the generated text. It affects the probability distribution of the model's output tokens. A higher temperature (e.g., 1.5) makes the output more random and creative, while a lower temperature (e.g., 0.5) makes the output more focused, deterministic, and conservative. The default value is 0.8, which provides a balance between randomness and determinism. At the extreme, a temperature of 0 will always pick the most likely next token, leading to identical outputs in each run.",)

top_p_field = Field(
    default=0.95,
    ge=0.0,
    le=1.0,
    description="Limit the next token selection to a subset of tokens with a cumulative probability above a threshold P.\n\n"
    + "Top-p sampling, also known as nucleus sampling, is another text generation method that selects the next token from a subset of tokens that together have a cumulative probability of at least p. This method provides a balance between diversity and quality by considering both the probabilities of tokens and the number of tokens to sample from. A higher value for top_p (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text.",
)

stop_field = Field(
    default=None,
    description="A list of tokens at which to stop generation. If None, no stop tokens are used.",
)

stream_field = Field(
    default=False,
    description="Whether to stream the results as they are generated. Useful for chatbots.",
)

assistant_session_id_field = Field(
    default=None,
    description="Assistant multi-round session identification.",
)

repeat_penalty_field = Field(
    default=1.1,
    ge=0.0,
    description="A penalty applied to each token that is already generated. This helps prevent the model from repeating itself.\n\n"
    + "Repeat penalty is a hyperparameter used to penalize the repetition of token sequences during text generation. It helps prevent the model from generating repetitive or monotonous text. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient.",
)

presence_penalty_field = Field(
    default=0.0,
    ge=-2.0,
    le=2.0,
    description="Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
)

frequency_penalty_field = Field(
    default=0.0,
    ge=-2.0,
    le=2.0,
    description="Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
)


class ChatCompletionRequestMessage(BaseModel):
    """Chat Completion Request Message"""
    role: Literal["system", "user", "assistant"] = Field(
        default="user", description="The role of the message."
    )
    content: str = Field(default="", description="The content of the message.")


class ChatRequest(BaseModel):
    """Basic Chat Request"""
    messages: List[ChatCompletionRequestMessage] = Field(
        default=[], description="A list of messages to generate completions for."
    )
    stream: bool = stream_field
    session_id: int = assistant_session_id_field
    keyword: str = Field(default=None, description="Keyword for the chat")
    context_carry_enabled = Field(
        default=False,
        description="Whether to merge historical records is required when building multi-agent systems"
    )
    @validator('keyword', pre=True)
    def mutually_exclusive(cls, value, values):
        session_id = values.get('session_id')
        if (value is not None and session_id is not None):
            raise ValueError('session_id and keyword are mutually exclusive')
        return value

PromptTokensDetails = Dict[str, int]
class ChatCompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: Optional[str]
    choices: List[Dict[str, Any]]
    usage: Dict[str, Union[int, PromptTokensDetails]]