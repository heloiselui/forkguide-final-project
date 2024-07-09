const path = require('path');

module.exports = {
  entry: './src/components/Main/MainApp.jsx',  // Caminho para o arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),  // Caminho absoluto para o diretório de saída
    filename: 'bundle.js',  // Nome do arquivo de saída
    clean: true,  // Limpa a pasta de saída antes de cada build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Regra para arquivos .js e .jsx
        exclude: /node_modules/,  // Exclui a pasta node_modules
        use: {
          loader: 'babel-loader',  // Usa babel-loader para transpilar o JavaScript
        },
      },
      {
        test: /\.css$/,  // Regra para arquivos .css
        use: ['style-loader', 'css-loader'],  // Usa style-loader e css-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Extensões que serão resolvidas automaticamente
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Diretório que será servido pelo servidor de desenvolvimento
    },
    compress: true,  // Habilita a compressão gzip
    port: 8080,  // Porta onde o servidor de desenvolvimento será executado
    open: true,  // Abre o navegador automaticamente
  },
};
