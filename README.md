# 🌦️ Previsão Climática — Web

Versão **web** do projeto Previsão Climática: pesquise uma cidade, veja o tempo atual e salve suas cidades favoritas com um clique na estrela.

| Parte | Repositório |
|---|---|
| API | [api-wheather](https://github.com/LucianoMachadoS/api-wheather) |
| Web (este) | [front-wheather](https://github.com/LucianoMachadoS/front-wheather) |
| Mobile (React Native) | [previsao-climatica-mobile-front](https://github.com/LucianoMachadoS/previsao-climatica-mobile-front) |

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## ✨ Funcionalidades

- Busca do tempo atual por nome da cidade
- Cartões com temperatura, condição, ícone do tempo e horário da última atualização (formatado com **date-fns**)
- **Cidades favoritas**: estrela para adicionar ou remover, lista em ordem alfabética
- Estados de carregamento e de lista vazia

## 🧱 Estrutura

```
src/
├── components/   # Header e WeatherCard
├── pages/        # WeatherPage
├── models/       # tipos TypeScript da resposta do tempo e das favoritas
└── lib/axios.ts  # cliente da API
```

## 🚀 Como rodar

Suba primeiro a [API](https://github.com/LucianoMachadoS/api-wheather).

```bash
git clone https://github.com/LucianoMachadoS/front-wheather.git
cd front-wheather
npm install
npm run dev
```

---
Feito por [Luciano Machado](https://github.com/LucianoMachadoS) · [LinkedIn](https://www.linkedin.com/in/luciano-machado-9253a1265/)
