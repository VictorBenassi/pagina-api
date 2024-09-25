import { GoogleGenerativeAI } from "@google/generative-ai";

// Acessar sua chave de API
const API_KEY = "AIzaSyAZ05DFP2IQe4WOHhKuiIedGCfRK88FrWw"; // Substitua por sua chave API

// Inicializa a API
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Função para ler a imagem como Base64
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Retorna o arquivo em Base64
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Converte o arquivo para Base64
    });
}

// Função para processar o input do usuário e gerar o conteúdo
async function run(prompt, fileBase64, mimeType) {
    const inputs = [prompt];
    if (fileBase64) {
        inputs.push({
            inlineData: {
                data: fileBase64.split(",")[1], // Remove o prefixo Base64
                mimeType: mimeType || "application/octet-stream", // Tipo de arquivo
            },
        });
    }

    try {
        const result = await model.generateContent(inputs);
        const response = await result.response.text(); // Obtenha o texto da resposta
        document.getElementById('output').innerText = response; // Exiba o texto no div
    } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
        document.getElementById('output').innerText = "Erro ao gerar conteúdo"; // Exiba o erro no div
    }
}

// Abre o explorador de arquivos ao clicar no botão de seleção de imagem
document.getElementById('imageButton').addEventListener('click', () => {
    document.getElementById('imageUpload').click(); // Simula o clique no input de arquivo
});

// Abre o explorador de arquivos ao clicar no botão de seleção de documento
document.getElementById('docButton').addEventListener('click', () => {
    document.getElementById('docUpload').click(); // Simula o clique no input de documento
});

// Função para exibir o nome do arquivo ou a pré-visualização
document.getElementById('imageUpload').addEventListener('change', async function () {
    const file = this.files[0];
    const previewDiv = document.getElementById('filePreview');

    if (file) {
        // Exibe o nome do arquivo
        previewDiv.innerHTML = `<p>Imagem selecionada: ${file.name}</p>`;

        // Exibe a miniatura da imagem
        const fileBase64 = await readFileAsBase64(file);
        previewDiv.innerHTML += `<img src="${fileBase64}" alt="Pré-visualização da Imagem" class="img-thumbnail mt-2" style="max-width: 200px;">`;
    } else {
        previewDiv.innerHTML = ""; // Limpa a visualização se o arquivo for removido
    }
});

// Função para exibir o nome do documento
document.getElementById('docUpload').addEventListener('change', async function () {
    const file = this.files[0];
    const previewDiv = document.getElementById('filePreview');

    if (file) {
        // Exibe o nome do arquivo
        previewDiv.innerHTML = `<p>Documento selecionado: ${file.name}</p>`;
    } else {
        previewDiv.innerHTML = ""; // Limpa a visualização se o arquivo for removido
    }
});

// Adiciona um event listener ao botão "GERAR"
document.getElementById('generateButton').addEventListener('click', async () => {
    const userInput = document.getElementById('search').value; // Pega o input do usuário
    const imageFile = document.getElementById('imageUpload').files[0]; // Pega o arquivo de imagem
    const docFile = document.getElementById('docUpload').files[0]; // Pega o arquivo de documento

    if (!userInput.trim() && !imageFile && !docFile) { // Verifica se o input, a imagem e o documento estão vazios
        document.getElementById('output').innerText = "Por favor, insira detalhes para sua apresentação, faça upload de uma imagem ou de um documento.";
        return;
    }

    let fileBase64 = null;
    let mimeType = null;

    if (imageFile) {
        try {
            fileBase64 = await readFileAsBase64(imageFile); // Converte a imagem para Base64
            mimeType = imageFile.type; // Tipo de imagem
        } catch (error) {
            console.error("Erro ao ler a imagem:", error);
            document.getElementById('output').innerText = "Erro ao processar a imagem.";
            return;
        }
    }

    if (docFile) {
        try {
            fileBase64 = await readFileAsBase64(docFile); // Converte o documento para Base64
            mimeType = docFile.type; // Tipo de documento
        } catch (error) {
            console.error("Erro ao ler o documento:", error);
            document.getElementById('output').innerText = "Erro ao processar o documento.";
            return;
        }
    }

    // Chama a função de geração com o input do usuário e o arquivo (imagem ou documento)
    await run(userInput, fileBase64, mimeType);
});
