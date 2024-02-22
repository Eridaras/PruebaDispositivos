import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Cargar la clave de API desde las variables de entorno
const apiKey = process.env.OPENAI_API_KEY;

// Cargar las incrustaciones de OpenAI una sola vez
const openAIEmbeddings = new OpenAIEmbeddings({ openAIApiKey:apiKey });

export const process_doc = async (filename: string | undefined, question: string) => {
    try {
        // Crear una instancia de OpenAI
        const model = new OpenAI({ openAIApiKey:apiKey, modelName: 'gpt-3.5-turbo-instruct' });

        // Cargar el documento PDF
        // Cargar el documento PDF
        const loader = new PDFLoader(`/Users/erick/Downloads/Proyectos Dispositivos Moviles/Dispo_Prueba-main/backend/uploads/${filename}`, {
            splitPages: false
        });
        const doc = await loader.load();

        // Crear un vectorStore a partir del documento y las incrustaciones de OpenAI
        const vectorStore = await MemoryVectorStore.fromDocuments(doc, openAIEmbeddings);
        const vectorStoreRetriever = vectorStore.asRetriever();

        // Crear una cadena de recuperación de preguntas y respuestas desde el modelo y el vectorStoreRetriever
        const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

        // Realizar la llamada a la cadena con la pregunta y devolver el resultado
        console.log(question);
        return await chain.invoke({
            query: question,
        });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error("Error en el proceso del documento:", error);
        throw error; // Re-lanzar el error para que sea manejado externamente si es necesario
    }
}
