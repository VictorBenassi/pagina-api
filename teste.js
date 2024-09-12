// Importa o módulo @google/generative-ai
import * as GenerativeAI from 'https://esm.run/@google/generative-ai';

// Aqui você pode usar as funcionalidades do módulo
// Por exemplo, se o módulo exporta uma função chamada `generateText`, você pode chamá-la assim:
GenerativeAI.generateText('Texto de exemplo')
  .then(response => {
    console.log('Resposta gerada:', response);
  })
  .catch(error => {
    console.error('Erro ao gerar texto:', error);
  });


import { GoogleGenerativeAI } from "@google/generative-ai";

// Acessar sua chave de API
const API_KEY = "AIzaSyAZ05DFP2IQe4WOHhKuiIedGCfRK88FrWw"; // Substitua por sua chave API

// Inicializa a API
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função para ler a imagem como Base64
function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Retorna a imagem em Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Converte a imagem para Base64
  });
}

// Função para processar o input do usuário e gerar o conteúdo
async function run(prompt, imageBase64) {
  const inputs = [prompt];
  if (imageBase64) {
    inputs.push({
      inlineData: {
        data: imageBase64.split(",")[1], // Remove o prefixo "data:image/jpeg;base64,"
        mimeType: "image/jpeg", // Altere conforme o tipo de imagem, se necessário
      },
    });
  }

  try {
    const result = await model.generateContent(inputs);
    const response = await result.response.text(); // Obtenha o texto da resposta
    document.getElementById('output').value = response; // Exiba o texto na textarea
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    document.getElementById('output').value = "Erro ao gerar conteúdo";
  }
}

// Abre o explorador de arquivos ao clicar no botão de seleção de imagem
document.getElementById('imageButton').addEventListener('click', () => {
  document.getElementById('imageUpload').click(); // Simula o clique no input de arquivo
});

// Função para exibir o nome do arquivo ou a pré-visualização da imagem
document.getElementById('imageUpload').addEventListener('change', async function () {
  const file = this.files[0];
  const previewDiv = document.getElementById('imagePreview');

  if (file) {
    // Exibe o nome do arquivo
    previewDiv.innerHTML = `<p>Imagem selecionada: ${file.name}</p>`;

    // Se desejar exibir uma miniatura da imagem
    const imageBase64 = await readImageFile(file);
    previewDiv.innerHTML += `<img src="${imageBase64}" alt="Pré-visualização da Imagem" class="img-thumbnail mt-2" style="max-width: 200px;">`;
  } else {
    previewDiv.innerHTML = ""; // Limpa a visualização se o arquivo for removido
  }
});

// Adiciona um event listener ao botão "GERAR"
document.getElementById('generateButton').addEventListener('click', async () => {
  const userInput = document.getElementById('search').value; // Pega o input do usuário
  const imageFile = document.getElementById('imageUpload').files[0]; // Pega o arquivo de imagem

  if (!userInput.trim() && !imageFile) { // Verifica se o input e a imagem estão vazios
    document.getElementById('output').value = "Por favor, insira detalhes para sua apresentação ou faça upload de uma imagem.";
    return;
  }

  let imageBase64 = null;

  if (imageFile) {
    try {
      imageBase64 = await readImageFile(imageFile); // Converte a imagem para Base64
    } catch (error) {
      console.error("Erro ao ler a imagem:", error);
      document.getElementById('output').value = "Erro ao processar a imagem.";
      return;
    }
  }

  // Chama a função de geração com o input do usuário e a imagem
  await run(userInput, imageBase64);
});