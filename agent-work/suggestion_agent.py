from strands import Agent, tool
from strands.models import BedrockModel
from pydantic import BaseModel, Field, conlist
import boto3
from pydantic import ValidationError
from strands.types.exceptions import StructuredOutputException

MODEL_ID = "arn:aws:bedrock:us-east-2:643472058632:inference-profile/us.anthropic.claude-3-haiku-20240307-v1:0"
KNOWLEDGE_BASE_ID = "1DE56PQCEA"

SUGGESTION_AGENT_PROMPT="""
You are a League of Legends draft expert who helps players analyze their champion pools and creates personalized recommendations for champions they pick up.
Categorize and draw insights from the 3 champions the player plays the most.
Then, categorize and draw insights from the 3 champions that the player loses against the most.
Suggest FIVE different champions to the player.
Make sure that your suggestions are relevant to the roles that the player mains.
Your suggestions should help players counter the types of enemy champions they have low win rates against. However, the reasoning and advice you give should be general.
Your suggestions should be based on the style of champion the player likes or help the player expand their range.
Provide extensive reasoning, with at least 3 sentences per reason. Highlight when suggestions are similar to champions the player enjoys.
Talk as if you are addressing the player directly.
"""

class SuggestionInfo(BaseModel):
    name: str = Field(description="The name of the champion")
    reason: str = Field(description="The reason the champion is suggested")

class SuggestionList(BaseModel):
    suggestions: list[SuggestionInfo] = Field(description="A list of champion suggestions")

model = BedrockModel(
    model_id=MODEL_ID,
)
bedrock_client = boto3.client('bedrock-agent-runtime')

@tool
def categorize_champions(query: str, max_results: int = 5) -> str:
    '''
    Given a list of champions, find similarities between them.
    Args:
        query: 'Please categorize these champions:' along with a list of specific champions you would like to categorize
    '''
    print("Query: " + query)
    try:
        response = bedrock_client.retrieve_and_generate(
            input={'text': query},
            retrieveAndGenerateConfiguration={
                'type': 'KNOWLEDGE_BASE',
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': KNOWLEDGE_BASE_ID,
                    'modelArn': MODEL_ID,
                    'retrievalConfiguration': {
                        'vectorSearchConfiguration': {
                            'numberOfResults': max_results
                        }
                    }
                }
            }
        )
        answer = response.get('output', {}).get('text', '')
        print("Answer: " + answer)
        citations = []
        for citation in response.get('citations', []):
            for ref in citation.get('retrievedReferences', []):
                citations.append({
                    'content_snippet': ref.get('content', {}).get('text', '')[:200] + '...',
                    'metadata': ref.get('metadata', {})
                })

        result = f"Analysis: {answer}\n\nSources: {len(citations)} match data references used"
        return result

    except Exception as e:
        print(str(e))
        return f"Error querying match data: {str(e)}"

agent = Agent(model=model, tools=[categorize_champions], system_prompt=SUGGESTION_AGENT_PROMPT)
TEST = """
    Please suggest new champions for player based on the player's match summary provided below:
    Player is a midlane main with support off lane
    On champion Hwei, player has 41 Wins and 35 Loss
        Hwei beat opposing Ahri 4 out of 7 games
        Hwei beat opposing Veigar 0 out of 7 games
        Hwei beat opposing Lux 3 out of 4 games
    On champion Ahri, player has 4 Wins and 6 Loss
        Ahri beat opposing Hwei 1 out of 2 games
        Ahri beat opposing ekko 1 out of 1 games
        Ahri beat opposing Miss Fortune 1 out of 1 games
    On champion Nautilus, player has 0 Wins and 1 Loss
        Nautilus beat opposing Thresh 1 out of 1 games
"""

try:
    result = agent(TEST, structured_output_model=SuggestionList)
    if result.structured_output:
        for suggestion in result.structured_output.suggestions:
            print(f"Champion: {suggestion.name}, Reason: {suggestion.reason}")
    else:
        print("No structured output found.")
except StructuredOutputException as e:
    print(f"Structured output failed: {e}")
