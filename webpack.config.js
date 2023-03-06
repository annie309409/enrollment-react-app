const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js", //진입(시작) 파일
    output: {
        path: path.join(__dirname, "dist"), //번들파일 저장위치
        filename: "app.bundle.js" //지정하지 않으면 main.js
    },
    module: { //각 파일에 대한 세부적인 번들링 작업 정의
        rules: [{ test: /\.js$/, //확장자가 .js로 끝나는 파일에 대한 규칙정의
            exclude: /node_modules/, loader: "babel-loader" },
            // 그림파일에 대한 세부적 번들링작업 (이미지 규칙)
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                use: [{ loader: "file-loader", },],},
        ]


    },
    devServer: {// npm start명령어로 서버 구동 시 필요한 관련 내용 설정
        static: path.join(__dirname, 'dist'),
        open: true, // 자동으로 브라우저 실행
        hot: true, // 수정사항 발생시 브라우저에 변경사항 즉시 반영
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 빌드시 dist안에 index.html을 바로 생성하는 플러그인
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};