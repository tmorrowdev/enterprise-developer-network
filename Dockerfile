FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY mcp-servers/package.json ./mcp-servers/
COPY dashboard/package.json ./dashboard/

RUN cd mcp-servers && npm install
RUN cd dashboard && npm install

COPY . .

RUN cd mcp-servers && npm run build

EXPOSE 3000 3002

COPY start.sh /app/
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]