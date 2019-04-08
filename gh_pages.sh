git checkout master
yarn build
mkdir ../temp_y_so_serious
cp -r build/* ../temp_y_so_serious/
git checkout gh-pages
cp -r ../temp_y_so_serious/* ./
git add .
git commit -m "page update - `date`"
git push origin gh-pages --no-verify
rm -rf ../temp_y_so_serious
git checkout master