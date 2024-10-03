# Simple RAG pipeline using `LangChain.js`

This repository contains the JavaScript version of the python RAG implementation by **Jodie Burchell** using `LangChain` as demoed in her [Beyond the Hype: A Realistic Look at Large Language Models](https://www.youtube.com/watch?v=Pv0cfsastFs) GOTO 2024 presentation.

- [Original repository](https://github.com/t-redactyl/simple-rag-document-qa) (Make sure to star)

- Here's a [detailed tutorial](https://js.langchain.com/v0.2/docs/tutorials/rag) about building a RAG app from the `LangChain` docs.

![](./assets/RAG.Indexing.png)

![](./assets/RAG.Retrieval.and.Generation.png)

## Prerequisites

If you intend to use a local LLM through Ollama, you will need to install [Ollama](https://ollama.com/) and the [llama3 LLM model](https://ollama.com/library/llama3) via Ollama. You will also need to install the [all-minilm](https://ollama.com/library/all-minilm) embeddings model, also via Ollama.

To ensure that you have successfully downloaded and installed all of the above, run the following commands through your terminal:

- Check whether Ollama is installed: `ollama --version`

- Check whether the required models are available: `ollama list`

## Key differences between the [original python repository](https://github.com/t-redactyl/simple-rag-document-qa/tree/main) and the JavaScript version 

- This is **not** a Jupyter Notebook.

- This code uses two types of Vector stores instead of one. The original code used the `ChromaDB` vector store, whereas this repo contains code using `ChromaDB` but also code using the In-memory vector store module provided by `LangChain.js`.

- The original code used OpenAI's API to connect with a remote LLM. This code uses OpenAI along with Anthropic's Claude and also uses a local LLM powered by Ollama. In this last case, the code uses OllamaEmbeddings which in turn uses the `all-minilm` embeddings model instead of OpenAIEmbeddings.

- The `nDocuments` variable found in the original code has been renamed to `kDocuments`.

- The original code used the `CharacterSplitter` for splitting the PDF documents, whereas this repo contains a variation using the `RecursiveCharacterTextSplitter`.

- The original repo contains a large PDF (pycharm-documentation.pdf which is around 174MB) that is used in the demo. This is a great source to test and also compare the results with the demo, but it turns out that it takes quite a lot of time to get vectorized. For testing purposes and making the process faster of vectorizing faster, especially in the case of the In-memory vector database which gets deleted every time the program gets restarted, a second smaller version of the original file has been added to the `/materials` folder. The file is called `pycharm-documentation-mini.pdf`, it's just 743KB and contains the first 10 pages of the original PDF. 

- Another PDF has been added for further testing. The file can be found in the `/materials` folder and it's named `MetaPrivacyPolicy.pdf`. It's around 4MB and contains the Meta's privacy policy as of 2024.

- Since both the `RetrievalQAChain` (JavaScript version) and `RetrievalQA` (Python version) have been deprecated in the latest versions of LangChain, the final version of the code contains a different implementation that makes it up-to-date and in accordance with the latest specs. Nevertheless, an example using `RetrievalQAChain` can still be found in this repo for an easy comparison between the JS and the Python code as demoed by Jodie Burchell in her presentation.

## Usage

- `git clone https://github.com/in-tech-gration/simple-rag-document-qa.git`
- `cd simple-rag-document-qa`
- `npm install`
- `node rag-pdf-qa.js`

## Repository contents

This repository contains the following material:

**JavaScript Branch:**

* `rag-pdf-qa.js` contains the code for the simple RAG pipeline. There are extensive comments in the code to help you understand how to adapt this for your own use case.
* `talk-materials/talk-sources.md` contains all of the papers and other sources Jodie Burchell used for her talk. It also contains all of her image credits.
* `talk-materials/beyond-the-hype.pdf` contains a copy of her slides.

---

The repo contains the following materials for Jodie Burchell's talk delivered at GOTO Amsterdam 2024.

**[Python Branch](https://github.com/in-tech-gration/simple-rag-document-qa/tree/python-original):**

* `/notebooks/rag-pdf-qa.ipynb` contains the code for the simple python RAG pipeline she demoed during the talk. There are extensive notes in Markdown in this notebook to help you understand how to adapt this for your own use case.
* `talk-materials/talk-sources.md` contains all of the papers and other sources she used for her talk. It also contains all of her image credits.
* `talk-materials/beyond-the-hype.pdf` contains a copy of her slides.

## Troubleshooting

- After cloning the repo, installing the dependencies and running `node rag-pdf-qa.js`, the following error is displayed in the terminal:
  > "TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined"
  - "This may be related to your Node.js version. The problem was resolved after upgrading from Node 18.17.0 to Node 20.17.0." _(Thanks to @rogerthao588 for sharing this issue with us)_
