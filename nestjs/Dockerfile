FROM node:20-slim 
# debian

RUN apt update -y && \
    apt install -y procps && \
    npm install -g @nestjs/cli@10.0.0

WORKDIR /home/node/app

USER node

# ler o dispositivo nulo do linux
CMD [ "tail", "-f", "/dev/null" ]
