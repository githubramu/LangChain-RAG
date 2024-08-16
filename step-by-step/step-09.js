import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import path from "node:path";
// import { RetrievalQAChain } from "langchain/chains"; // Deprecated
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

class PdfQA {

  constructor({ model, pdfDocument, chunkSize, chunkOverlap, searchType = "similarity", kDocuments }) {

    this.model        = model;
    this.pdfDocument  = pdfDocument;
    this.chunkSize    = chunkSize;
    this.chunkOverlap = chunkOverlap;

    this.searchType   = searchType;
    this.kDocuments   = kDocuments;

  }

  async init(){
    this.initChatModel();
    await this.loadDocuments();
    await this.splitDocuments();
    this.selectEmbedding = new OllamaEmbeddings({ model: "all-minilm:latest" });
    await this.createVectorStore();
    this.createRetriever();
    this.chain = await this.createChain();
    return this;
  }

  initChatModel(){
    console.log("Loading model...");
    this.llm = new Ollama({ model: this.model });
  }

  async loadDocuments(){
    console.log("Loading PDFs...");
    const pdfLoader = new PDFLoader(path.join(import.meta.dirname,this.pdfDocument));
    this.documents = await pdfLoader.load();
  }

  async splitDocuments(){
    console.log("Splitting documents...");
    const textSplitter = new CharacterTextSplitter({ 
      separator: " ",
      chunkSize: this.chunkSize,
      chunkOverlap: this.chunkOverlap 
    });
    this.texts = await textSplitter.splitDocuments(this.documents);

  }

  async createVectorStore(){
    console.log("Creating document embeddings...");
    this.db = await MemoryVectorStore.fromDocuments(this.texts, this.selectEmbedding);
  }

  createRetriever(){
    console.log("Initialize vector store retriever...");
    this.retriever = this.db.asRetriever({ 
      k: this.kDocuments,
      searchType: this.searchType 
    });
  }

  async createChain(){
    console.log("Creating Retrieval QA Chain...");

    // Deprecated:
    // const chain = RetrievalQAChain.fromLLM(this.llm, this.retriever);
    // Replace with suggested code: https://v02.api.js.langchain.com/classes/langchain.chains.RetrievalQAChain.html

    // We are using a custom Chat Prompt Template for this one, so that the LLM has a context provided along with our query
    const prompt = ChatPromptTemplate.fromTemplate(`Answer the user's question: {query} based on the following context {context}`);

    // Creates a chain that passes a list of documents to a model
    const combineDocsChain = await createStuffDocumentsChain({
      llm: this.llm,
      prompt,
    });

    // Create a retrieval chain that retrieves documents and then passes them on
    const chain = await createRetrievalChain({
      combineDocsChain,
      retriever: this.retriever,
    });

    return chain;
  }

  queryChain(){
    return this.chain;
  }

}

const pdfDocument = "../materials/pycharm-documentation-mini.pdf";

const pdfQa = await new PdfQA({ 
  model: "llama3", 
  pdfDocument,
  chunkSize: 1000,
  chunkOverlap: 0,
  searchType: "similarity",
  kDocuments: 5 
}).init();

const pdfQaChain = pdfQa.queryChain();

console.log(process.env.CLAUDE_API_KEY);

// Let's try it out by asking how we can debug in PyCharm.
// const answer1 = await pdfQaChain.invoke({ query: "How do we add a custom file type in PyCharm?" });
// console.log( "🤖", answer1.text, "\n" );