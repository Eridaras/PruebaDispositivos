"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const dotenv = __importStar(require("dotenv"));
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const lang_script_1 = require("./lang_script");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 9004;
app.use((0, cors_1.default)());
const path = __importStar(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter(req, file, callback) {
        const fileExtension = path.extname(file.originalname);
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs ara allowed'));
        }
        callback(null, true);
    }
});
app.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.file || !((_a = req.body) === null || _a === void 0 ? void 0 : _a.question)) {
        return res.status(400).send();
    }
    const response = yield (0, lang_script_1.process_doc)((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename, req.body.question);
    res.send(response);
    res.send({
        response: response.body.question.choices[0].text,
        token: response.usage.total_tokens
    });
}));
let names = [
    {
        id: (0, uuid_1.v4)(),
        firstName: 'Elvis',
        lastName: 'Herrera'
    },
    {
        id: (0, uuid_1.v4)(),
        firstName: 'Lea',
        lastName: 'Rolfes'
    }
];
app.get("/ping", (req, res) => {
    console.log("alguien ha dado pin!!");
    res.setHeader("Content-Type", "application/json");
    res.send("pong");
});
app.get("/hola/:nombre/:apellido", (req, res) => {
    console.log("alguien ha dado pin!!");
    res.setHeader("Content-Type", "application/json");
    const nombre = req.params.nombre;
    const apellido = req.params.apellido;
    console.log("alguien ha ingresado su nombre");
    res.send({ nombre, apellido });
});
app.get('/nombres', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(names);
});
app.post('/nombres', (req, res) => {
    const item = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() });
    names.push(item);
    res.send(item);
});
const openai_1 = require("@langchain/openai");
// Crear una instancia de Configuration con tu clave API
const configuration = new openai_1.OpenAI({
    openAIApiKey: "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",
});
// Crear una instancia de OpenAI con la configuración
const openai = new openai_1.OpenAI(configuration);
const generatePrompt = (numberToConvert) => {
    return `Tu tienes un rol de convertidor binario y requiero que conviertes este numero ${numberToConvert} a  binario `;
};
app.post('/openapi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        const completion = yield openai.completionWithRetry({
            model: 'gpt-3.5-turbo-instruct',
            prompt: generatePrompt(prompt),
            temperature: 0.1
        });
        if (completion) {
            if (completion.usage) {
                if (completion.choices[0]) {
                    res.send({
                        result: completion.choices[0].text,
                        token: completion.usage.total_tokens
                    });
                }
                else {
                    res.status(500).send({ error: 'No se pudo obtener la información de uso.' });
                }
            }
            else {
                res.status(500).send({ error: 'No se pudo obtener la información de uso.' });
            }
        }
        else {
            res.status(500).send({ error: 'No se pudo obtener la información de uso.' });
        }
        //res.send({ result: completion.data.choices[0].text.trim(), token: completion.data.usage.total_tokens });
    }
    catch (error) {
        console.error('Error en la ruta /openapi:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}));
const generatePromptVocal = (vocalToConvert) => {
    return `cuantas vocales tiene la palabra ${vocalToConvert} y dame las estadisticas`;
};
app.post('/openapiVocal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        const completion = yield openai.completionWithRetry({
            model: 'gpt-3.5-turbo-instruct',
            prompt: generatePromptVocal(prompt),
            temperature: 0.1
        });
        if (completion.usage) {
            if (completion.choices[0]) {
                res.send({
                    result: completion.choices[0].text,
                    token: completion.usage.total_tokens
                });
            }
            else {
                res.status(500).send({ error: 'No se pudo obtener la información de uso.' });
            }
        }
        else {
            res.status(500).send({ error: 'No se pudo obtener la información de uso.' });
        }
        //res.send({ result: completion.data.choices[0].text.trim(), token: completion.data.usage.total_tokens });
    }
    catch (error) {
        console.error('Error en la ruta /openapi:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}));
app.delete('/nombres/:id', (req, res) => {
    names = names.filter(n => n.id !== req.params.id);
    res.status(204).end();
});
app.get('/nombres/:id', (req, res) => {
    const searchedName = names.find(n => n.id === req.params.id);
    if (!searchedName)
        res.status(400).end();
    res.send(searchedName);
});
app.put('/nombres/:id', (req, res) => {
    const index = names.findIndex(n => n.id === req.params.id);
    if (index === -1)
        res.status(404).end();
    names[index] = Object.assign(Object.assign({}, req.body), { id: req.params.id });
    res.status(204).end();
});
app.listen(PORT, () => {
    console.log(`running application ${PORT}`);
});
