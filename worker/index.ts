import { PrismaClient } from "@prisma/client";
import { Worker } from "bullmq";
import { config } from "dotenv";
import { Ollama } from "ollama";
config();

const client = new PrismaClient();

const ollama = new Ollama({
  host: process.env.OLLAMA_URL,
});

// Change this to be of type prompt with a prompt id?
type PostJobPayload = {
  postId: number;
}

new Worker("posts", async (job) => {
  const {postId} = job.data as PostJobPayload;
  console.log(`Processing post ${postId}`);

  await new Promise((resolve) => setTimeout(resolve,  60000));

  const post = await client.post.findUnique({
    where: { id: postId },
  });

  const response = await ollama.chat({
    model: 'tinyllama',
    messages: [{ role: 'user', content:`Give the user helpful advice on the following mental and emotional 
      health question: ${post?.title}`  }]
  })

  console.log(response)
  
  await client.post.update({
    where: { id: postId },
    data: {
      content: response.message.content,
      generated: true,
    },
  });

  console.log(`Post ${postId} processed`);
}, {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
})
