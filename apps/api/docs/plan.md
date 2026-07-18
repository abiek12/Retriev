# Implementation plans
## Stage 1 - Indexing
1. Load the document - pdf, text, docs, etc.
2. Chunk the document.
3. Generate vector embeddings.
4. Store the vector embeddings in vectore databases.

## Stage 2 - Retrieval
1. Setup LLM.
2. Add a retrieval step.
3. Pass input + relevant information from the retrieval data and pass to llm.
4. return the llm response.
