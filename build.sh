rm -rf static
rm -f index.html
yarn build
cp -r build/static .
cp build/index.html .