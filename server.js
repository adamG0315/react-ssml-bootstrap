const express = require('express');
const cors = require('cors'); // Import CORS module
const app = express();
const port = 4000;

// Enable CORS for all routes and origins
app.use(cors());

const ssmlParts = [
  "<speak>Here is the first part of our text. It introduces the topic and starts the discussion.</speak>",
  "<speak>This second part continues with more detailed information, expanding on the first part.</speak>",
  "<speak>The third part provides further insights, including examples and anecdotes to illustrate the points made.</speak>",
  "<speak>Finally, the fourth part concludes the discussion, summarizing the key points and closing with a thought-provoking question.</speak>",
];

// Endpoint to fetch paginated SSML
app.get('/ssml', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 1;
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedSSML = ssmlParts.slice(start, end);

  // Check if there are more parts available for pagination
  const hasMore = end < ssmlParts.length;

  res.json({
    content: paginatedSSML,
    page,
    pageSize,
    hasMore,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
