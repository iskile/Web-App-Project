set -e
sudo scp -i deploy_rsa -o stricthostkeychecking=no -r  frontend/dist build@b.leadcoin.network:~/
sudo scp -i deploy_rsa -o stricthostkeychecking=no -r  frontend/storybook-build build@b.leadcoin.network:~/