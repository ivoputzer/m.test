before_install:
- npm i standard babel-cli babel-preset-es2015
before_deploy:
- node_modules/.bin/babel ./ --out-dir ./ --ignore node_modules --presets es2015
