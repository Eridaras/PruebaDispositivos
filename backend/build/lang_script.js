"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.process_doc = void 0;
const openai_1 = require("@langchain/openai");
const chains_1 = require("langchain/chains");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const openai_2 = require("@langchain/openai");
const memory_1 = require("langchain/vectorstores/memory");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Cargar la clave de API desde las variables de entorno
const apiKey = process.env.OPENAI_API_KEY;
// Cargar las incrustaciones de OpenAI una sola vez
const openAIEmbeddings = new openai_2.OpenAIEmbeddings({ openAIApiKey: apiKey });
const process_doc = (filename, question) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crear una instancia de OpenAI
        const model = new openai_1.OpenAI({ openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo-instruct' });
        // Cargar el documento PDF
        // Cargar el documento PDF
        const loader = new pdf_1.PDFLoader(`D:/Semestre 23_24/Dispositivos_prueba/Dispositivos_App_React-main/Dispositivos_App_React-main/mobil-2-main/backend/uploads/${filename}`, {
            splitPages: false
        });
        const doc = yield loader.load();
        // Crear un vectorStore a partir del documento y las incrustaciones de OpenAI
        const vectorStore = yield memory_1.MemoryVectorStore.fromDocuments(doc, openAIEmbeddings);
        const vectorStoreRetriever = vectorStore.asRetriever();
        // Crear una cadena de recuperación de preguntas y respuestas desde el modelo y el vectorStoreRetriever
        const chain = chains_1.RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
        // Realizar la llamada a la cadena con la pregunta y devolver el resultado
        console.log(question);
        return yield chain.invoke({
            query: question,
        });
    }
    catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error("Error en el proceso del documento:", error);
        throw error; // Re-lanzar el error para que sea manejado externamente si es necesario
    }
});
exports.process_doc = process_doc;
